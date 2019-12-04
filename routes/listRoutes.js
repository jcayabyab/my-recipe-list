const camelcaseKeys = require("camelcase-keys");
const {
  sendSQLError,
  sendGenericError,
  sendNotFoundError,
  sendNotOneUpdateError
} = require("../utils/sendErrorFunctions");
const toSqlDateTime = require("../utils/toSqlDateTime");

module.exports = (app, connection) => {
  // create list if not exists
  app.get("/api/list", async (req, res) => {
    const { userName } = req.query;

    const query = `
        SELECT * FROM LIST
        WHERE OwnerUserName = ${connection.escape(userName)}
      `;

    try {
      let [rows] = await connection.promise().query(query);

      if (rows.length === 0) {
        const insertQuery = `
          INSERT INTO LIST VALUES
          (
            ${connection.escape(userName)},
            ${connection.escape(`${userName}'s list`)},
            ${connection.escape(toSqlDateTime(new Date()))}
          )
        `;

        const [results] = await connection.promise().query(insertQuery);

        if (results.affectedRows !== 1) {
          return sendNotOneUpdateError(res);
        }

        [rows] = await connection.promise().query(query);
      }

      // for each row, populate list with recipe entries
      const listData = await Promise.all(
        rows.map(async row => {
          const rowData = camelcaseKeys({ ...row });

          const rowQuery = `
          SELECT rc.recipeId, rc.name, rc.description, rc.pictureUrl, AVG(rv.OverallRating) AS 'overallRating', c.amountOfTimesMade
          FROM RECIPE as rc LEFT JOIN (REVIEW as rv, CONTAINS as c)
          ON rv.RecipeID = rc.RecipeID 
          WHERE rc.RecipeID = c.RecipeID
          AND c.ListName = ${connection.escape(rowData.listName)}
          AND c.OwnerUserName = ${connection.escape(rowData.ownerUserName)}
          GROUP BY rc.recipeId, rc.name, rc.description, rc.pictureUrl
          `;

          const [recipes] = await connection.promise().query(rowQuery);
          rowData.recipes = recipes;
          return rowData;
        })
      );

      // send only 1 list for now
      res.send(listData[0]);
    } catch (error) {
      console.log(error);
      return sendSQLError(res);
    }
  });

  app.post("/api/list/add", async (req, res) => {
    const { userName, recipeId } = req.body;

    // TODO make this from client side
    const listName = `${userName}'s list`;

    const query = `
      INSERT INTO CONTAINS VALUES
      (
        ${connection.escape(userName)},
        ${connection.escape(listName)},
        ${connection.escape(recipeId)},
        0
      )
    `;

    try {
      const [results] = await connection.promise().query(query);

      if (results.affectedRows !== 1) {
        return sendNotOneUpdateError(res);
      }

      res.send("Success");
    } catch (error) {
      return sendSQLError(res);
    }
  });

  app.post("/api/list/remove", async (req, res) => {
    const { userName, recipeId } = req.body;

    // TODO make this from client side
    const listName = `${ownerUserName}'s list`;

    const query = `
      DELETE FROM CONTAINS
      WHERE
        OwnerUserName = ${connection.escape(userName)},
        AND ListName = ${connection.escape(listName)},
        AND RecipeID = ${connection.escape(recipeId)}
      )
    `;

    try {
      const [results] = await connection.promise().query(query);

      if (results.affectedRows !== 1) {
        return sendNotOneUpdateError(res);
      }

      res.send("Success");
    } catch (error) {
      return sendSQLError(res);
    }
  });

  app.post("/api/list/meal", async (req, res) => {
    const { userName, recipeId, increment } = req.body;

    const query = `
      UPDATE CONTAINS
      SET AmountOfTimesMade = (AmountOfTimesMade ${increment ? "+" : "-"} 1)
      WHERE OwnerUserName = ${connection.escape(userName)}
      AND RecipeID = ${connection.escape(recipeId)}
    `;

    try {
      const [results] = await connection.promise().query(query);

      if (results.affectedRows !== 1) {
        return sendNotOneUpdateError(res);
      }

      res.send("Success");
    } catch (error) {
      return sendSQLError(res);
    }
  });
};
