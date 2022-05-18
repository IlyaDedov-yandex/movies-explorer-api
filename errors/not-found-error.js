const { NOTFOUND_CODE } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOTFOUND_CODE;
  }
}

module.exports = NotFoundError;
