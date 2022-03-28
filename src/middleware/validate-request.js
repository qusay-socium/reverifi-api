const { validationResult } = require('express-validator');

const { BadRequest } = require('lib/errors');

/**
 * Check request validation errors.
 *
 * @param {import('express').Request} req Express route request object.
 * @param {import('express').Response} res Express route response object.
 * @param {import('express').NextFunction} next Express route next function.
 */
const validateRequest = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    next();
    return;
  }

  throw new BadRequest(
    'Bad request',
    result.array().map(({ msg, param }) => ({ message: msg, param }))
  );
};

module.exports = validateRequest;
