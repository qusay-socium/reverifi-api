const jwt = require('jsonwebtoken');
const { Unauthorized } = require('lib/errors');
const { getUser } = require('../services/user');

/**
 * Login by token.
 * Check if the token valid.
 *
 * @param {express.Request}      req Token.
 * @param {express.Response}     res
 * @param {express.NextFunction} next
 *
 * @return {object} User Information's (username,password,email).
 */
module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new Unauthorized('There is no token.');
  }

  const token = req.headers.authorization.split(' ').pop();
  const parsedToken = jwt.verify(token, process.env.SECRET);
  const userData = await getUser(parsedToken.email);
  if (userData) {
    req.user = userData;
    next();
  } else {
    throw new Unauthorized('Invalid token.');
  }
};
