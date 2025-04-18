const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../utils/errors");  // Import custom error

const auth = (req, res, next) => {
    const { authorization } = req.headers;
  
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(new UnauthorizedError("Authorization Required"));  // Pass the error to the next middleware
    }

    const token = authorization.replace("Bearer ", "");
    let payload;

    try {
        payload = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return next(new UnauthorizedError("Authorization Required"));  // Pass the error to the next middleware
    }

    req.user = payload;
    return next();
};

module.exports = auth;