const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const UnauthorizedError = require('../errors/unauthorized-error');

module.exports = (req, res, next) => {
  const cookies = req.cookies.jwt;

  if (!cookies) {
    throw new UnauthorizedError('Ошибка: Необходима авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(cookies, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('Ошибка: Необходима авторизация');
  }
  req.user = payload;
  next();
};
