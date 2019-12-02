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
      const [rows] = connection.promise().query(query);

      // { categoryName, description, pictureUrl }
      return camelcaseKeys(rows);
    } catch (error) {
      return sendSQLError(res);
    }
  });
};
