const Movie = require('../models/movie');

const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const { SUCCESS_CODE } = require('../utils/constants');

const getMovies = (req, res, next) => {
  const userId = req.user._id;
  return Movie.find({ owner: userId })
    .then((movies) => {
      if (movies) {
        return res
          .status(SUCCESS_CODE)
          .send(movies);
      }
      throw new NotFoundError('Ошибка: Фильмы не найдены');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(`Ошибка: ${err.message}`));
      }
      return next(err);
    });
};
const createMovie = (req, res, next) => Movie.create({ ...req.body, owner: req.user._id })
  .then((movie) => res
    .status(SUCCESS_CODE)
    .send(movie))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Ошибка: Переданы некорректные данные при создании фильма.'));
    }
    return next(err);
  });

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  Movie.findById(_id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Ошибка: Фильм с указанным _id не найден.');
      }
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError('Ошибка: Не достаточно прав для удаления фильма');
      }
      return Movie.findByIdAndRemove(_id)
        .then((cardToDelete) => res
          .status(SUCCESS_CODE)
          .send(cardToDelete))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Ошибка: Передан невалидный _id.'));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
