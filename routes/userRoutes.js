const camelcaseKeys = require("camelcase-keys");
const {
  sendSQLError,
  sendGenericError,
  sendNotFoundError,
  sendNotOneUpdateError
} = require("../utils/sendErrorFunctions");

module.exports = (app, connection) => {
  app.get("/api/profiles", async (req, res) => {
    const { searchTerm } = req.query;
    const query = `
      SELECT UserName, FirstName, LastName, Country, ProfilePictureUrl
      FROM USER
      ${searchTerm &&
        ` WHERE UserName LIKE ${connection.escape(`%${searchTerm}%`)}`}
    `;

    try {
      const [rows] = await connection.promise().query(query);

      res.send(camelcaseKeys(rows));
    } catch (error) {
      console.log(error);
      return sendSQLError(res);
    }
  });

  app.get("/api/profile", async (req, res) => {
    const { ownUserName, userName } = req.query;
    try {
      let query = `
        SELECT 
          UserName, FirstName, LastName, Country, ProfilePictureUrl,
            CASE WHEN EXISTS
            (
              SELECT * FROM FRIEND
              WHERE
              (
                UserName_A = ${connection.escape(ownUserName)}
                AND UserName_B = ${connection.escape(userName)}
              )
              OR
              (
                UserName_B = ${connection.escape(ownUserName)}
                AND UserName_A = ${connection.escape(userName)}
              )
            )
            THEN 1 ELSE 0 END
            AS isFriend
        FROM USER
        WHERE UserName = ${connection.escape(userName)}
      `;

      const [rows] = await connection.promise().query(query);

      if (rows.length === 0) {
        return sendNotFoundError(res);
      }

      res.send(camelcaseKeys(rows[0]));
    } catch (error) {
      return sendSQLError(res);
    }
  });

  app.post("/api/user/delete", async (req, res) => {
    const { userName } = req.body;
    try {
      let query = `
        DELETE FROM USER
        WHERE UserName = ${connection.escape(userName)}
      `;

      const [results] = await connection.promise().query(query);

      if (results.affectedRows !== 1) {
        return sendNotOneUpdateError(res);
      }

      res.send("Successfully deleted user " + userName);
    } catch (error) {
      return sendSQLError(res);
    }
  });

  app.post("/api/user/update", async (req, res) => {
    //DELETE this when functional
    console.log(req.body);
    const {
      userName,
      firstName,
      lastName,
      country,
      profilePictureUrl
    } = req.body;
    try {
      let query = `
        UPDATE USER
        SET 
          FirstName = ${connection.escape(firstName)},
          LastName = ${connection.escape(lastName)},
          Country = ${connection.escape(country)},
          ProfilePictureUrl = ${connection.escape(profilePictureUrl)}
        WHERE
          UserName = ${connection.escape(userName)}
      `;

      const [results] = await connection.promise().query(query);

      if (results.affectedRows !== 1) {
        sendNotOneUpdateError(res);
      }

      res.send("Success");
    } catch (error) {
      //DELETE this when functional
      console.log(error);
      return sendSQLError(res);
    }
  });

  app.post("/api/user/friend", async (req, res) => {
    const { ownUserName, userName } = req.body;

    const query = `
      INSERT INTO FRIEND
      VALUES (${connection.escape(ownUserName)}, ${connection.escape(userName)})
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

  app.post("/api/user/unfriend", async (req, res) => {
    const { ownUserName, userName } = req.body;

    const query = `
      DELETE FROM FRIEND
      WHERE
      (
        UserName_A = ${connection.escape(ownUserName)}
        AND
        UserName_B = ${connection.escape(userName)}
      )
      OR
      (
        UserName_B = ${connection.escape(ownUserName)}
        AND
        UserName_A = ${connection.escape(userName)}
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
};
