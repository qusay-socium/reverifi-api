const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Unauthorized, BadRequest } = require('lib/errors');
const { secret } = require('config/config');
const { getUser, createUser } = require('services/user');
const response = require('utils/response');

/**
 * Get token response after login or signup.
 *
 * @param {Object} user User data.
 *
 * @return {Object} Object contain the token.
 */
const getTokenResponse = ({ id, email, name }) => ({
  token: jwt.sign({ id, email, name }, secret),
});

/**
 * Login user.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await getUser(email.toLowerCase());

  if (!user) {
    throw new Unauthorized('Invalid email or password');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Unauthorized('Invalid email or password');
  }
  res.json(response(getTokenResponse(user)));
};

/**
 * Create new account.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const signup = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const dbUser = await getUser(email.toLowerCase());

  if (dbUser) {
    throw new BadRequest('Email already in use');
  }

  req.body.email = email.toLowerCase();

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await createUser({
    name,
    email: email.toLowerCase(),
    password: passwordHash,
    phone,
  });

  res.json(response(getTokenResponse(user)));
};

module.exports = { signup, login };
