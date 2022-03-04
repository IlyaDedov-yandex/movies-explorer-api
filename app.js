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
const { limiter } = require('./middlewares/rate-limits');

const { PORT = 4000 } = process.env;

const app = express();
app.use(requestLogger);
app.use(limiter);
app.use(cors({
  origin: ['https://movies.practicum.nomoredomains.work/', /\.movies.practicum.nomoredomains.work$/, 'http://movies.practicum.nomoredomains.work/'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use('/', routes);
app.use(errorLogger);
app.use(errors());
app.use(checkErrors);
mongoose.connect(MONGO_CON_ADDRESS, {
  useNewUrlParser: true,
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
