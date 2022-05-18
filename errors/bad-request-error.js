const { ERROR_CODE } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE;
  }
}

module.exports = BadRequestError;
