const camelcaseKeys = require("camelcase-keys");
const {
  sendSQLError,
  sendGenericError,
  sendNotFoundError,
  sendNotOneUpdateError
} = require("../utils/sendErrorFunctions");
const toSqlDateTime = require("../utils/toSqlDateTime");

module.exports = (app, connection) => {
  app.get("/api/reviews", async (req, res) => {
    const { recipeId } = req.query;

    const query = `
        SELECT r.*, urw.WriterUserName
        FROM REVIEW AS r, USER_REVIEW_WRITES AS urw
        WHERE r.RecipeID = urw.RecipeID
        AND r.ReviewID = urw.ReviewID
        AND r.RecipeID = ${connection.escape(recipeId)}
        ORDER BY r.TimePosted ASC;
      `;

    try {
      const [rows] = await connection.promise().query(query);

      res.send(camelcaseKeys(rows));
    } catch (error) {
      sendSQLError(res);
    }
  });

  app.post("/api/review/create", async (req, res) => {
    const { recipeId, userName, rating, title, body } = req.body;
    const { presentation, taste, nv, easyToFollow } = rating;

    const reviewQuery = `
      INSERT INTO REVIEW
      (
        RecipeID,
        OverallRating,
        PresentationRating,
        TasteRating,
        NVRating,
        EasyFollowRating,
        Title,
        Body,
        TimePosted
      )
      VALUES
      (
        ${connection.escape(recipeId)},
        ${connection.escape(
          (+easyToFollow + +presentation + +taste + +nv) / 4
        )},
        ${connection.escape(+presentation)},
        ${connection.escape(+taste)},
        ${connection.escape(+nv)},
        ${connection.escape(+easyToFollow)},
        ${connection.escape(title)},
        ${connection.escape(body)},
        ${connection.escape(toSqlDateTime(new Date()))}
      )  
    `;

    try {
      let [results] = await connection.promise().query(reviewQuery);

      if (results.affectedRows !== 1) {
        return sendNotOneUpdateError(res);
      }

      const reviewId = results.insertId;

      const writesQuery = `
      INSERT INTO USER_REVIEW_WRITES
      VALUES
      (
        ${connection.escape(userName)},
        ${connection.escape(recipeId)},
        ${connection.escape(reviewId)}
      )
      `;

      [results] = await connection.promise().query(writesQuery);

      if (results.affectedRows !== 1) {
        return sendNotOneUpdateError(res);
      }

      res.send("Success");
    } catch (error) {
      console.log(error);
      return sendSQLError(res);
    }
  });

  app.post("/api/review/delete", async (req, res) => {
    const { reviewId } = req.body;

    let query = `
      DELETE FROM REVIEW
      WHERE ReviewID = ${connection.escape(reviewId)}
    `;

    try {
      const [results] = await connection.promise().query(query);

      if (results.affectedRows !== 1) {
        return sendNotOneUpdateError(res);
      }

      res.send("Successfully deleted review " + reviewId);
    } catch (error) {
      return sendSQLError(res);
    }
  });
};
