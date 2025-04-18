const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../utils/errors");

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new UnauthorizedError("Authorization Required");
    }

    const token = authorization.replace("Bearer ", "");
    const payload = jwt.verify(token, JWT_SECRET);

    req.user = payload;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error instanceof UnauthorizedError) {
      next(new UnauthorizedError("Authorization Required"));
    } else {
      next(error); // Pass other errors to general error handler
    }
  }
};

module.exports = auth;