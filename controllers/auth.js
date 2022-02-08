const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { jwtSign } = require('../helpers/jwt-sign');
const { SALT_ROUNDS, COOKIES_MAX_AGE } = require('../config/config');

const UnauthorizedError = require('../errors/unauthorized-error');
const ConflictError = require('../errors/conflict-error');
const BadRequestError = require('../errors/bad-request-error');
const {
  SUCCESS_CODE,
  DUPLICATE_KEY_CODE,
  VALIDATION_ERROR,
  UNAUTHORIZED_ERROR_MESSAGE,
  CONFLICT_EMAIL_MESSAGE,
  BAD_REQUEST_USER_MESSAGE,
} = require('../utils/constants');

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, SALT_ROUNDS)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res
      .send({
        name: user.name,
        email: user.email,
      }))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return next(new BadRequestError(BAD_REQUEST_USER_MESSAGE));
      }
      if (err.code === DUPLICATE_KEY_CODE) {
        return next(new ConflictError(CONFLICT_EMAIL_MESSAGE));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError(BAD_REQUEST_USER_MESSAGE);
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwtSign(user._id);
      res
        .status(SUCCESS_CODE)
        .cookie('jwt', token, {
          maxAge: COOKIES_MAX_AGE,
          httpOnly: true,
          sameSite: true,
        })
        .end();
    })
    .catch(() => next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE)));
};

const signout = (req, res) => {
  res
    .status(SUCCESS_CODE)
    .clearCookie('jwt', {
      secure: true,
      sameSite: 'none',
    })
    .end();
};

module.exports = {
  createUser,
  login,
  signout,
};
