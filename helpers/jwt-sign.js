const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const jwtSign = (id) => jwt.sign(
  { _id: id },
  JWT_SECRET,
  { expiresIn: '7d' },
);

module.exports = {
  jwtSign,
};
