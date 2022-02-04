const { celebrate, Joi } = require('celebrate');

module.exports = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required().max(30),
    password: Joi.string().required().min(8),
  }),
});
