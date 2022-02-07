const { NODE_ENV, JWT_SECRET_PROD, MONGO_ADDR_PROD } = process.env;
const SALT_ROUNDS = 10;
const JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET_PROD : 'secret496565';
const MONGO_CON_ADDRESS = NODE_ENV === 'production' ? MONGO_ADDR_PROD : 'mongodb://localhost:27017/moviesdb';

module.exports = {
  SALT_ROUNDS,
  JWT_SECRET,
  MONGO_CON_ADDRESS,
};
