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
};
