const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const UnauthorizedError = require('../errors/unauthorized-error');
const { UNAUTHORIZED_ERROR_MESSAGE } = require('../utils/constants');

module.exports = (req, res, next) => {
  const cookies = req.cookies.jwt;

  if (!cookies) {
    throw new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE);
  }
  let payload;
  try {
    payload = jwt.verify(cookies, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE);
  }
  req.user = payload;
  next();
};
