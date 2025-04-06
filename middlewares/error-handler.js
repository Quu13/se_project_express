const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  ConflictError,
} = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  // Check the type of error and handle it
  if (err instanceof BadRequestError) {
    return res.status(400).send({ message: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).send({ message: err.message });
  }

  if (err instanceof ForbiddenError) {
    return res.status(403).send({ message: err.message });
  }

  if (err instanceof ConflictError) {
    return res.status(409).send({ message: err.message });
  }

  // If the error is unknown or an internal server error, return a 500
  console.error(err); // Log the error stack
  return res.status(500).send({ message: "An error occurred on the server" });
};

module.exports = errorHandler;
