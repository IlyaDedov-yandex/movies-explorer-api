const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized-error');
const { UNAUTHORIZED_ERROR_MESSAGE_2, VALIDATION_EMAIL_MESSAGE } = require('../utils/constants');

const isEmail = (v) => validator.isEmail(v);
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isEmail,
      message: VALIDATION_EMAIL_MESSAGE,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE_2));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE_2));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
