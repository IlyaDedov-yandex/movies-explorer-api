const { NODE_ENV, JWT_SECRET_PROD } = process.env;
const SALT_ROUNDS = 10;
const JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET_PROD : 'secret496565';
module.exports = {
  SALT_ROUNDS,
  JWT_SECRET,
};
