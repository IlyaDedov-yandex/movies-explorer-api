require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const routes = require('./routes');
const { MONGO_CON_ADDRESS } = require('./config/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const checkErrors = require('./middlewares/check-errors');
const auth = require('./middlewares/auth');
const { limiter } = require('./middlewares/rate-limits');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000 } = process.env;

const app = express();
app.use(limiter);
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(cookieParser());
app.use('/', routes);
app.use(auth, () => {
  throw new NotFoundError('Ошибка: Page not found');
});
app.use(errorLogger);
app.use(errors());
app.use(checkErrors);
mongoose.connect(MONGO_CON_ADDRESS, {
  useNewUrlParser: true,
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
