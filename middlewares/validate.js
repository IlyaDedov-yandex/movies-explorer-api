const { celebrate, Joi } = require('celebrate');

const { regexUrlPattern } = require('../utils/constants');

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
    image: Joi.string().required().regex(regexUrlPattern),
    trailerLink: Joi.string().required().regex(regexUrlPattern),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(regexUrlPattern),
    movieId: Joi.string().required().length(24).hex(),
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
