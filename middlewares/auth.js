const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const UnauthorizedError = require('../errors/unauthorized-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Ошибка: Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('Ошибка: Необходима авторизация');
  }

  req.user = payload;
  next();
};
