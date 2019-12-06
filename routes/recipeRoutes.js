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

    let query = buildRecipeSearchQuery(
      connection,
      searchQuery,
      ingredients,
      kitchenItems
    );

    try {
      const [rows] = await connection.promise().query(query);
      res.send(camelcaseKeys(rows));
    } catch (error) {
      console.log("SQL exception occurred: " + error);
      return sendSQLError(res);
    }
  });

  app.get("/api/recipe", async (req, res) => {
    const { recipeId, userName } = req.query;

    let recipeQuery = `
      SELECT r.*, u.FirstName, u.LastName, u.ProfilePictureUrl,
      CASE WHEN EXISTS
      (
        SELECT * FROM CONTAINS AS c
        WHERE c.OwnerUserName = ${connection.escape(userName)}
        AND r.RecipeID = c.RecipeID
      )
      THEN 1 ELSE 0 END
      AS isInList
      FROM RECIPE as r, USER_RECIPE_WRITES as urw, USER as u
      WHERE r.RecipeID = ${connection.escape(recipeId)}
      AND r.RecipeID = urw.RecipeID
      AND urw.UserName = u.UserName
    `;

    let ingrQuery = `
      SELECT i.ItemName, i.Calories
      FROM NEEDS AS n, INGREDIENT AS i
      WHERE n.RecipeID = ${connection.escape(recipeId)}
      AND n.ItemName = i.ItemName
    `;

    let wareQuery = `
      SELECT w.ItemName, w.purchaseLink
      FROM NEEDS AS n, KITCHENWARE AS w
      WHERE n.RecipeID = ${connection.escape(recipeId)}
      AND n.ItemName = w.ItemName
    `;

    let stepsQuery = `
      SELECT StepNum, Description FROM STEP
      WHERE RecipeID = ${connection.escape(recipeId)}
      ORDER BY StepNum ASC;
    `;

    let reviewsQuery = `
      SELECT r.*, urw.WriterUserName, u.profilePictureUrl
      FROM REVIEW AS r, USER_REVIEW_WRITES AS urw, USER as u
      WHERE r.RecipeID = urw.RecipeID
      AND r.ReviewID = urw.ReviewID
      AND r.RecipeID = ${connection.escape(recipeId)}
      AND u.UserName = urw.WriterUserName
      ORDER BY r.TimePosted DESC
    `;

    try {
      const [rows] = await connection.promise().query(recipeQuery);
      const [ingredients] = await connection.promise().query(ingrQuery);
      const [kitchenware] = await connection.promise().query(wareQuery);
      const [steps] = await connection.promise().query(stepsQuery);
      const [reviews] = await connection.promise().query(reviewsQuery);

      if (rows.length === 0) {
        return sendNotFoundError(res);
      }

      const recipe = camelcaseKeys(rows[0]);
      recipe.ingredients = camelcaseKeys(ingredients);
      recipe.kitchenware = camelcaseKeys(kitchenware);
      recipe.steps = camelcaseKeys(steps);
      recipe.reviews = camelcaseKeys(reviews);

      res.send(recipe);
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
      const [results] = await connection.promise().query(query);

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
      const {
        name,
        description,
        pictureUrl,
        ingredients,
        kitchenware,
        steps,
        userName,
        categories
      } = req.body;

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

      let [results] = await connection.promise().query(query);

      if (results.affectedRows !== 1) {
        return sendNotOneUpdateError(res);
      }

      const recipeId = results.insertId;

      const itemsQuery = `
        INSERT INTO NEEDS
        VALUES
        ${[...ingredients, ...kitchenware]
          .map(
            item =>
              `(${connection.escape(recipeId)}, ${connection.escape(item)})`
          )
          .join(", ")}
      `;

      const categoriesQuery = `
        INSERT INTO BELONGS_TO
        VALUES
        ${categories
          .map(
            (category, index) =>
              `(
              ${connection.escape(recipeId)},
              ${connection.escape(category)}
              )`
          )
          .join(", ")}
      `;

      const stepsQuery = `
        INSERT INTO STEP
        VALUES
        ${steps
          .map(
            (step, index) =>
              `(
              ${connection.escape(recipeId)},
              ${connection.escape(index + 1)},
              ${connection.escape(step)}
              )`
          )
          .join(", ")}
      `;

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

      console.log(categoriesQuery);

      if ([...kitchenware, ...ingredients].length !== 0) {
        await connection.promise().query(itemsQuery);
      }
      await connection.promise().query(stepsQuery);
      await connection.promise().query(categoriesQuery);

      // short way to avoid making another SQL query
      res.send({ recipeId });
    } catch (error) {
      console.log(error);
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
            SELECT * FROM NEEDS as n
            WHERE n.ItemName IN
            ${generateSQLCollectionFromArr(connection, ingredients)}
            AND n.RecipeID = rc.recipeID
          )
        `
        : null;

    const kitchenItemsSQLStr =
      kitchenItems.length !== 0
        ? `
          EXISTS
          (
            SELECT * FROM NEEDS
            WHERE ItemName IN
            ${generateSQLCollectionFromArr(connection, kitchenItems)}
            AND n.RecipeID = rc.recipeID
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
