const camelcaseKeys = require("camelcase-keys");
const {
  sendSQLError,
  sendUsernameExists,
  sendFailedLogin,
  sendGenericError
} = require("../utils/sendErrorFunctions");

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
          return sendSQLError(res);
        }
        if (results.length !== 1) {
          return sendFailedLogin(res);
        }
        res.send(camelcaseKeys(results[0]));
      }
    );
  });

  app.post("/api/login/create", async (req, res) => {
    const { userName, password, firstName, lastName, country } = req.fields;
    const profilePictureUrl = null; // eventually upload to 3rd-party API

    connection.query(
      `
      INSERT INTO USER
      VALUES
      (
        ${connection.escape(userName)},
        ${connection.escape(password)},
        ${connection.escape(firstName)},
        ${connection.escape(lastName)},
        ${connection.escape(profilePictureUrl)},
        ${connection.escape(country)}
      )
      `,
      (error, results, fields) => {
        if (error) {
          console.log(error.sqlMessage);
          if (error.code === "ER_DUP_ENTRY") {
            return sendUsernameExists(res);
          }
          return sendSQLError(500);
        }
        if (results.affectedRows !== 1) {
          // failed registration (or extra registration?)
          console.log(
            "Less than or more than 1 row was affected during registration"
          );
          return sendGenericError(
            "Less than or more than 1 row was affected during registration."
          );
        }
        connection.query(
          `
          SELECT * FROM USER 
          WHERE UserName=${connection.escape(userName)} 
        `,
          (innerError, innerResults, innerFields) => {
            if (innerError) {
              return sendSQLError(res);
            }
            res.send(camelcaseKeys(innerResults[0]));
          }
        );
      }
    );
  });
};
