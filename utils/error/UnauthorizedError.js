const { UNAUTH_ERROR } = require("../statusCodes");

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTH_ERROR;
    this.name = "UnauthorizedError";
  }
}

module.exports = UnauthorizedError;