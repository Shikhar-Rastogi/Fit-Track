const jwt = require("jsonwebtoken");
const { createError } = require("../error.js");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(createError(401, "You are not authenticated"));
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(createError(401, "Token missing"));
    }

    jwt.verify(token, process.env.JWT, (err, decoded) => {
      if (err) {
        return next(createError(403, "Invalid token"));
      }

      // ✅ IMPORTANT: normalize user object
      req.user = {
        id: decoded.id,
      };

      next(); 
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyToken };
