const { CONFLICT_ERROR } = require("../statusCodes");

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_ERROR;
    this.name = "ConflictError";
  }
}

module.exports = ConflictError;