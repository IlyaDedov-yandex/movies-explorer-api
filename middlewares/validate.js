const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const { VALIDATION_URL_MESSAGE } = require('../utils/constants');

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  }),
});

const movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(VALIDATION_URL_MESSAGE);
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(VALIDATION_URL_MESSAGE);
    }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(VALIDATION_URL_MESSAGE);
    }),
    movieId: Joi.number().integer().greater(0).required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().length(24).hex(),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required().max(30),
    password: Joi.string().required().min(8),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().max(30),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  signupValidation,
  signinValidation,
  userValidation,
  movieValidation,
  movieIdValidation,
};
