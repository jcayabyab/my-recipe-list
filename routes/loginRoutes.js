const camelcaseKeys = require("camelcase-keys");
const {
  sendSQLError,
  sendUsernameExists,
  sendFailedLogin,
  sendNotOneUpdateError
} = require("../utils/sendErrorFunctions");

module.exports = (app, connection) => {
  app.get("/api/login", async (req, res) => {
    const { username, password } = req.query;
    try {
      const [rows] = await connection.promise().query(
        `
        SELECT u.*,
          CASE WHEN EXISTS
          (
            SELECT * FROM ADMIN AS a
            WHERE a.UserName = u.UserName
          )
          THEN 1 ELSE 0 END
          AS isAdmin
        FROM USER as u
        WHERE u.UserName=${connection.escape(username)}
        AND u.Password=${connection.escape(password)}
      `
      );
      if (rows.length !== 1) {
        return sendFailedLogin(res);
      }

      res.send(camelcaseKeys(rows[0]));
    } catch (error) {
      console.log("SQL exception occurred: " + error);
      return sendSQLError(res);
    }
  });

  app.post("/api/login/create", async (req, res) => {
    const {
      userName,
      password,
      firstName,
      lastName,
      country,
      profilePictureUrl
    } = req.body;

    // register new user
    try {
      const [insertRows] = await connection.promise().query(`
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
      `);

      if (insertRows.affectedRows !== 1) {
        // failed registration (or extra registration?)
        return sendNotOneUpdateError(res);
      }

      const [userRows] = await connection.promise().query(
        `
          SELECT * FROM USER 
          WHERE UserName=${connection.escape(userName)}
        `
      );

      res.send(camelcaseKeys(userRows[0]));
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return sendUsernameExists(res);
      }
      console.log("SQL exception occurred: " + error);
      return sendSQLError(res);
    }
  });
};
