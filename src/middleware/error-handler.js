/* eslint-disable default-param-last */
/**
 *  Error classes.
 */

// eslint-disable-next-line max-classes-per-file
class BaseError extends Error {
  constructor(msg, code) {
    super(msg);
    this.code = code;
    this.msg = msg;
  }
}

class NotFound extends BaseError {
  constructor(msg = 'Not Found Page!', code) {
    super(msg, (code = 404));
    this.msg = msg;
  }
}

class Validation extends BaseError {
  constructor(msg = 'Invalid request data or syntax!', hint) {
    super(msg);
    this.code = 400;
    this.msg = msg;
  }
}
class Authentication extends BaseError {
  constructor(msg = 'Unauthorized!', hint) {
    super(msg);
    this.code = 401;
  }
}

/**
 * Error handler middleware.
 */
const response = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  // const errorMsg = err.code ? err.msg : 'Error occurred!';
  const errMsg = err.msg || err.message;
  res.json(response(undefined, err.code || 500, errMsg));
};

module.exports = {
  errorHandler,
  NotFound,
  Validation,
  Authentication,
};
