/**
 * App global error handler.
 *
 * @param {Error} error Error object.
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 * @param {import('express').NextFunction} next Express next function.
 */
const errorHandler = (error, req, res, next) => {
  const { message, statusCode = 500, errors } = error;
  const response = {
    code: statusCode,
    message,
  };
  if (errors) {
    response.errors = errors;
  }
  res.status(statusCode).json(response);
};

module.exports = errorHandler;
