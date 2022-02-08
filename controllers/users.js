const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');
const {
  DUPLICATE_KEY_CODE,
  CAST_ERROR,
  VALIDATION_ERROR,
  BAD_REQUEST_USER_MESSAGE,
  CONFLICT_EMAIL_MESSAGE,
  NOTFOUND_USER_MESSAGE,
} = require('../utils/constants');

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  return User.findById(userId)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      throw new NotFoundError(NOTFOUND_USER_MESSAGE);
    })
    .catch((err) => next(err));
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new BadRequestError(BAD_REQUEST_USER_MESSAGE);
  }
  return User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOTFOUND_USER_MESSAGE);
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR || err.name === CAST_ERROR) {
        return next(new BadRequestError(BAD_REQUEST_USER_MESSAGE));
      }
      if (err.code === DUPLICATE_KEY_CODE) {
        return next(new ConflictError(CONFLICT_EMAIL_MESSAGE));
      }
      return next(err);
    });
};

module.exports = {
  getUserInfo,
  updateUser,
};
