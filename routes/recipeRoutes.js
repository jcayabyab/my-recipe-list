const camelcaseKeys = require("camelcase-keys");
const {
  sendSQLError,
  sendGenericError,
  sendNotFoundError,
  sendNotOneUpdateError
} = require("../utils/sendErrorFunctions");

module.exports = (app, connection) => {
  // all recipes
  app.get("/api/recipes", async (req, res) => {
    try {
      let query = `
        SELECT rc.recipeId, rc.name, rc.description, rc.pictureUrl, AVG(rv.OverallRating) AS 'overallRating'
        FROM RECIPE as rc LEFT JOIN REVIEW as rv
        ON rv.RecipeID = rc.RecipeID
        GROUP BY rc.recipeId, rc.name, rc.description, rc.pictureUrl
       `;

      const [rows] = await connection.promise().query(query);

      res.send(camelcaseKeys(rows));
    } catch (error) {
      console.log("SQL exception occurred: " + error);
      return sendSQLError(res);
    }
  });

  app.post("/api/recipes/search", async (req, res) => {
    // accepts { name: String, ingredients: array of string, kitchenItems: array of string }
    const { searchQuery, ingredients, kitchenItems } = req.body;

    console.log(req.body);

    let query = buildRecipeSearchQuery(
      connection,
      searchQuery,
      ingredients,
      kitchenItems
    );

    console.log(query);

    try {
      const [rows] = await connection.promise().query(query);
      res.send(camelcaseKeys(rows));
    } catch (error) {
      console.log("SQL exception occurred: " + error);
      return sendSQLError(res);
    }
  });

  app.get("/api/recipe", async (req, res) => {
    const { recipeId } = req.query;

    let query = `
      SELECT * FROM RECIPE
      WHERE RecipeID = ${connection.escape(recipeId)} 
    `;

    try {
      const [rows] = await connection.promise().query(query);

      if (rows.length === 0) {
        return sendNotFoundError(res);
      }

      res.send(rows[0]);
    } catch (error) {
      console.log("SQL exception occurred: " + error);
      return sendSQLError(res);
    }
  });

  app.post("/api/recipe/delete", async (req, res) => {
    const { recipeId } = req.body;

    let query = `
      DELETE FROM RECIPE
      WHERE RecipeID=${connection.escape(recipeId)}
    `;

    try {
      const [results] = connection.promise().query(query);

      if (results.affectedRows !== 1) {
        return sendNotOneUpdateError(res);
      }

      res.send("Successfully deleted recipe with ID " + recipeId);
    } catch (error) {
      console.log("SQL exception occurred: " + error);
      return sendSQLError(res);
    }
  });

  app.post("/api/recipe/create", async (req, res) => {
    try {
      // add needs and steps later
      // ingredients, kitchenware, steps: all arrays
      const { name, description, pictureUrl } = req.body;

      let query = `
        INSERT INTO RECIPE
        (Name, Description, PictureUrl)
        VALUES
        (
          ${connection.escape(name)},
          ${connection.escape(description)},
          ${connection.escape(pictureUrl)} 
        )
      `;

      // TODO add steps generation

      // TODO add needs kitchenware and ingredients

      const [results] = connection.promise().query(query);

      if (results.affectedRows !== 1) {
        return sendNotOneUpdateError(res);
      }

      const recipeId = results.insertId;

      const writesQuery = `
      INSERT INTO USER_RECIPE_WRITES
      VALUES
      (
        ${connection.escape(userName)},
        ${connection.escape(recipeId)}
      )
      `;

      [results] = await connection.promise().query(writesQuery);

      if (results.affectedRows !== 1) {
        return sendNotOneUpdateError(res);
      }

      // short way to avoid making another SQL query
      res.send({ recipeId, name, description, pictureUrl });
    } catch (error) {
      return sendSQLError(res);
    }
  });

  app.post("/api/recipe/edit", async (req, res) => {
    const { recipeId, name, description, pictureUrl } = req.body;
    try {
      let query = `
        UPDATE RECIPE
        SET 
          Name = ${connection.escape(name)},
          Description = ${connection.escape(description)},
          ProfilePictureUrl = ${connection.escape(profilePictureUrl)}
        WHERE
          RecipeID = ${conneciton.escape(recipeId)}
      `;

      const [results] = connection.promise().query(query);

      if (results.affectedRows !== 1) {
        return sendNotOneUpdateError(res);
      }

      res.send({ recipeId, name, description, pictureUrl });
    } catch (error) {
      console.log("SQL exception occurred: " + error);
      return sendSQLError(res);
    }
  });
};

/**
 * takes in array, return sql string for usage like IN ...
 */
const generateSQLCollectionFromArr = (connection, arr) => {
  if (arr.length === 0) return null;
  let str = "(";
  for (let i = 0; i < arr.length; i++) {
    str += connection.escape(arr[i]);
    if (i !== arr.length - 1) {
      str += ", ";
    }
  }
  str += ")";
  return str;
};

const buildRecipeSearchQuery = (
  connection,
  recipeName,
  ingredients,
  kitchenItems
) => {
  let query = `
    SELECT rc.recipeId, rc.name, rc.description, rc.pictureUrl, AVG(rv.OverallRating) AS 'overallRating'
    FROM RECIPE as rc LEFT JOIN REVIEW as rv
    ON rv.RecipeID = rc.RecipeID 
  `;

  if (recipeName || ingredients.length !== 0 || kitchenItems.length !== 0) {
    query += " WHERE ";

    const recipeNameStr = recipeName
      ? `rc.Name LIKE ${connection.escape(`%${recipeName}%`)}`
      : null;

    const ingredientsSQLStr =
      ingredients.length !== 0
        ? `
          EXISTS
          (
            SELECT * FROM INGREDIENT
            WHERE ItemName IN
            ${generateSQLCollectionFromArr(connection, ingredients)}
          )
        `
        : null;

    const kitchenItemsSQLStr =
      kitchenItems.length !== 0
        ? `
          EXISTS
          (
            SELECT * FROM KITCHEN_ITEM
            WHERE ItemName IN
            ${generateSQLCollectionFromArr(connection, kitchenItems)}
          )
        `
        : null;

    query += [recipeNameStr, ingredientsSQLStr, kitchenItemsSQLStr]
      .filter(str => str)
      .join(" OR ");
  }

  query += ` GROUP BY rc.recipeId, rc.name, rc.description, rc.pictureUrl`;

  return query;
};
