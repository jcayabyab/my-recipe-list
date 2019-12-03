const camelcaseKeys = require("camelcase-keys");
const {
  sendSQLError,
  sendGenericError,
  sendNotFoundError,
  sendNotOneUpdateError
} = require("../utils/sendErrorFunctions");

module.exports = (app, connection) => {
  app.get("/api/categories", async (req, res) => {
    const query = `SELECT * FROM CATEGORY`;

    try {
      const [rows] = await connection.promise().query(query);

      // { categoryName, description, pictureUrl }
      res.send(camelcaseKeys(rows));
    } catch (error) {
      console.log(error);
      return sendSQLError(res);
    }
  });

  app.get("/api/category", async (req, res) => {
    const { categoryName } = req.query;

    let categoryQuery = `
      SELECT * FROM CATEGORY
      WHERE CategoryName = ${connection.escape(categoryName)}
    `;

    let recipeQuery = `
        SELECT rc.recipeId, rc.name, rc.description, rc.pictureUrl, AVG(rv.OverallRating) AS 'overallRating'
        FROM RECIPE as rc LEFT JOIN REVIEW as rv
        ON rv.RecipeID = rc.RecipeID
        WHERE EXISTS
        (
          SELECT * FROM BELONGS_TO as bt
          WHERE bt.CategoryName = ${connection.escape(categoryName)}
          AND bt.RecipeID = rc.RecipeID
        )
        GROUP BY rc.recipeId, rc.name, rc.description, rc.pictureUrl
       `;

    try {
      const [categories] = await connection.promise().query(categoryQuery);
      const category = categories[0];

      const [recipes] = await connection.promise().query(recipeQuery);

      category.recipes = recipes;

      res.send(camelcaseKeys(category));
    } catch (error) {
      console.log("SQL exception occurred: " + error);
      return sendSQLError(res);
    }
  });
};
