const mongoose = require('mongoose');
const validator = require('validator');

const isUrl = (v) => validator.isURL(v);
const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: isUrl,
      message: 'Ошибка: Введите валидный url адрес',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: isUrl,
      message: 'Ошибка: Введите валидный url адрес',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: isUrl,
      message: 'Ошибка: Введите валидный url адрес',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
