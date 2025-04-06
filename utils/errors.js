const { 
  BAD_REQUEST, 
  UNAUTH_ERROR, 
  FORBIDDEN, 
  NOT_FOUND, 
  CONFLICT_ERROR, 
  SERVER_ERROR 
} = require("./statusCodes");  // Import your status code constants

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
    this.name = "BadRequestError";
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTH_ERROR;
    this.name = "UnauthorizedError";
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
    this.name = "ForbiddenError";
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
    this.name = "NotFoundError";
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_ERROR;
    this.name = "ConflictError";
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.status = SERVER_ERROR;
    this.name = "ServerError";
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ServerError
};