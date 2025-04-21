const { SERVER_ERROR } = require("../statusCodes");

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.status = SERVER_ERROR;
    this.name = "ServerError";
  }
}

module.exports = ServerError;