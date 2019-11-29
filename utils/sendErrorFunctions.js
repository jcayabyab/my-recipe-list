module.exports = {
  sendSQLError: res =>
    res
      .status(500) // server error occurred
      .send("A SQL Exception occurred on the backend."),
  sendUsernameExists: res =>
    res
      .status(403) // 403 forbidden
      .send("Username already exists!"),
  sendFailedLogin: res =>
    res.status(401).send("Login failed: incorrect username or password."),
  sendGenericError: (res, errorMsg) => res.status(500).send(errorMsg)
};
