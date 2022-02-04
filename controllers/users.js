const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const { SUCCESS_CODE } = require('../utils/constants');

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  return User.findById(userId)
    .then((user) => {
      if (user) {
        return res
          .status(SUCCESS_CODE)
          .send(user);
      }
      throw new NotFoundError('Ошибка: Пользователь с указанным _id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(`Ошибка: ${err.message}`));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new BadRequestError('Ошибка: Переданы некорректные данные при обновлении профиля');
  }
  return User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Ошибка: Пользователь с указанным _id не найден.');
      }
      return res
        .status(SUCCESS_CODE)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new BadRequestError('Ошибка: Переданы некорректные данные при обновлении профиля.'));
      }
      return next(err);
    });
};

module.exports = {
  getUserInfo,
  updateUser,
};
