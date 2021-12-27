// eslint-disable-next-line max-classes-per-file
class BaseError extends Error {
  constructor(message, statusCode, errors) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

class InternalError extends BaseError {
  constructor(message) {
    super(message, 500);
  }
}

class NotFound extends BaseError {
  constructor(message) {
    super(message, 404);
  }
}

class BadRequest extends BaseError {
  constructor(message, errors) {
    super(message, 400, errors);
  }
}

class Unauthorized extends BaseError {
  constructor(message) {
    super(message, 401);
  }
}

module.exports = {
  InternalError,
  NotFound,
  BadRequest,
  Unauthorized,
};
