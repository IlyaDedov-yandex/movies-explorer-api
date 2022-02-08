const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const authRouter = require('./auth');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const { NOTFOUND_MESSAGE } = require('../utils/constants');

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.use('/', authRouter);
router.use(auth, () => {
  throw new NotFoundError(NOTFOUND_MESSAGE);
});

module.exports = router;
