const camelcaseKeys = require("camelcase-keys");
const { sendSQLError } = require("../utils/sendErrorFunctions");

module.exports = (app, connection) => {
  app.get("/api/ingredients", async (req, res) => {
    const query = `SELECT * FROM INGREDIENT`;

    try {
      const [rows] = await connection.promise().query(query);

      // { itemName, pictureUrl }
      res.send(camelcaseKeys(rows));
    } catch (error) {
      console.log(error);
      return sendSQLError(res);
    }
  });

  app.get("/api/kitchenware", async (req, res) => {
    const query = `SELECT * FROM KITCHENWARE`;

    try {
      const [rows] = await connection.promise().query(query);

      // { itemName, pictureUrl }
      res.send(camelcaseKeys(rows));
    } catch (error) {
      console.log(error);
      return sendSQLError(res);
    }
  });
};
