require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const checkErrors = require('./middlewares/check-errors');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(requestLogger);
app.use('/', routes);
app.use(auth, () => {
  throw new NotFoundError('Ошибка: Page not found');
});
app.use(errorLogger);
app.use(errors());
app.use(checkErrors);
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
