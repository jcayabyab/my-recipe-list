const camelcaseKeys = require("camelcase-keys");

module.exports = (app, connection) => {
  app.get("/api/login", async (req, res) => {
    const { username, password } = req.query;
    connection.query(
      `
      SELECT * FROM USER
      WHERE UserName=${connection.escape(username)}
      AND Password=${connection.escape(password)}
    `,
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return res
            .status(500) // server error occurred
            .send("A SQL Exception occurred on the backend.");
        }
        if(results.length !== 1) {
          return res.status(401).send("Login failed.") // failed login (or extra logins?)
        }
        res.send(camelcaseKeys(results[0]));
      }
    );
  });
};
