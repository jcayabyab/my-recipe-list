module.exports = {
  sendSQLError: res =>
    sendError(res, 500, "A SQL Exception occurred on the backend."),
  sendUsernameExists: res => sendError(res, 403, "Username already exists!"),
  sendFailedLogin: res =>
    sendError(res, 401, "Login failed: incorrect username or password."),
  sendNotFoundError: res =>
    sendError(res, 404, "No data with that ID Found!"),
  sendNotOneUpdateError: res =>
    sendError(
      res,
      500,
      "Not exactly one data entry modified. Check server for undefined behaviour."
    ),
  sendGenericError: (res, errorMsg) => sendError(res, 500, errorMsg)
};

const sendError = (res, code, errorMsg) => {
  console.log("Code: " + code, "Error: " + errorMsg);
  return res.status(code).send(errorMsg);
};
