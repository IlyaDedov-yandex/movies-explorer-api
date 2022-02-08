const { DEFAULT_ERROR_CODE, DEFAULT_ERROR_MESSAGE } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = DEFAULT_ERROR_CODE, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === DEFAULT_ERROR_CODE
        ? DEFAULT_ERROR_MESSAGE
        : message,
    });
  next();
};
