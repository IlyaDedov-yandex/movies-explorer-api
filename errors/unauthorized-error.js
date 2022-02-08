const { ERROR_UNAUTH } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_UNAUTH;
  }
}

module.exports = UnauthorizedError;
