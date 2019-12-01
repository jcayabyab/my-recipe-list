const camelcaseKeys = require("camelcase-keys");
const {
  sendSQLError,
  sendGenericError
} = require("../utils/sendErrorFunctions");

module.exports = (app, connection) => {
  // all recipes
  app.get("/api/recipes", async (req, res) => {
    connection.query(
      `
      SELECT * FROM RECIPE;
      `,
      (error, results, fields) => {
        if (error) {
          console.log("SQL exception occurred: " + error);
          return sendSQLError(res);
        }
        res.send(camelcaseKeys(results));
      }
    );
  });

  app.post("/api/recipes/search", async (req, res) => {
    // accepts { name: String, ingredients: array of string, kitchenItems: array of string }
    const { recipeName, ingredients, kitchenItems } = req.body;

    let query = buildRecipeSearchQuery(
      connection,
      recipeName,
      ingredients,
      kitchenItems
    );

    connection.query(query, (error, results, fields) => {
      if (error) {
        console.log("SQL exception occurred: " + error);
        return sendSQLError(res);
      }
      res.send(camelcaseKeys(results));
    });
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
  let query = "SELECT * FROM RECIPE";
  if (recipeName || ingredients.length !== 0 || kitchenItems.length !== 0) {
    query += " WHERE ";

    const recipeNameStr = recipeName
      ? `Name LIKE ${connection.escape(`%${recipeName}%`)}`
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

  query += ";";
  return query;
};