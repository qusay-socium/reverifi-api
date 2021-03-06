const jwt = require('jsonwebtoken');
const { Unauthorized } = require('lib/errors');
const { User } = require('models');
const { secret } = require('config/config');

/**
 * Middleware to check if request has a valid token.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 * @param {import('express').NextFunction} next Express next function.
 */
module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Unauthorized('Authorization header required');
  }

  const parsedToken = jwt.verify(authorization.split(' ').pop(), secret);
  const user = await User.getOneByCondition({ id: parsedToken.id });

  if (!user) {
    throw new Unauthorized('Invalid token');
  }

  req.user = user;
  next();
};
