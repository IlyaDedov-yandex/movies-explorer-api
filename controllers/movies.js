const Movie = require('../models/movie');

const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const {
  CAST_ERROR,
  VALIDATION_ERROR,
  NOTFOUND_FILMS_MESSAGE,
  BAD_REQUEST_FILMS_MESSAGE,
  FORBIDDEN_FILMS_MESSAGE,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  const userId = req.user._id;
  return Movie.find({ owner: userId })
    .then((movies) => {
      if (movies.length > 0) {
        return res
          .send(movies);
      }
      throw new NotFoundError(NOTFOUND_FILMS_MESSAGE);
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return next(new BadRequestError(`Ошибка: ${err.message}`));
      }
      return next(err);
    });
};
const createMovie = (req, res, next) => Movie.create({ ...req.body, owner: req.user._id })
  .then((movie) => res.send(movie))
  .catch((err) => {
    if (err.name === VALIDATION_ERROR) {
      return next(new BadRequestError(BAD_REQUEST_FILMS_MESSAGE));
    }
    return next(err);
  });

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  Movie.findById(_id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOTFOUND_FILMS_MESSAGE);
      }
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError(FORBIDDEN_FILMS_MESSAGE);
      }
      return Movie.findByIdAndRemove(_id)
        .then((cardToDelete) => res.send(cardToDelete))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return next(new BadRequestError(BAD_REQUEST_FILMS_MESSAGE));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
