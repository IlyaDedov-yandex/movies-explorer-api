const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { jwtSign } = require('../helpers/jwt-sign');
const { SALT_ROUNDS } = require('../config/config');

const UnauthorizedError = require('../errors/unauthorized-error');
const ConflictError = require('../errors/conflict-error');
const BadRequestError = require('../errors/bad-request-error');
const { SUCCESS_CODE } = require('../utils/constants');

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, SALT_ROUNDS)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res
      .status(SUCCESS_CODE)
      .send({
        name: user.name,
        email: user.email,
      }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Ошибка: Переданы некорректные данные при создании пользователя.'));
      }
      if (err.code === 11000) {
        return next(new ConflictError('Ошибка: Пользователь с таким email уже зарегистрирован.'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwtSign(user._id);
      res
        .status(SUCCESS_CODE)
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .end();
    })
    .catch(() => next(new UnauthorizedError('Ошибка: Ошибка аутентификации')));
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
