const { ERROR_ACCESS_DENIED } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_ACCESS_DENIED;
  }
}

module.exports = ForbiddenError;
