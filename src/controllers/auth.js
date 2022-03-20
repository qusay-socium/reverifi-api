const { scryptSync } = require('crypto');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const { Unauthorized, BadRequest } = require('lib/errors');
const { secret } = require('config/config');
const { User, LoginProviders } = require('models');
const response = require('utils/response');
const { OAuth2Client } = require('google-auth-library');

const GOOGLE_CLEINT_ID = '136239126169-7ffbg6nhe5uno7p0ng4kvbld4mak9dph.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLEINT_ID);

// TODO: move the salt to env var
const hashSalt = 'hash-salt';

const getHash = (password) => scryptSync(password, hashSalt, 32).toString('hex');

/**
 * Get token response after login or signup.
 *
 * @param {Object} user User data.
 *
 * @return {Object} Object contain the token.
 */
const getTokenResponse = ({ id, email, name, phone, roles, points, createdAt }) => ({
  token: jwt.sign({ id, email, name, phone, roles, points, createdAt }, secret),
});

/**
 * Social Login.
 *
 * @param {String} email User email.
 * @param {String} name User name.
 *
 * @return {Object} Object contain the user data.
 */
const socialLogin = async (email, name, provider) => {
  const dbUser = await User.getOneByCondition({ email });

  if (!dbUser) {
    const newUser = await User.createOne({
      name,
      email,
    });
    await LoginProviders.createOne({ userId: newUser.id, provider });
  }

  if (dbUser) {
    await LoginProviders.createOne({ userId: dbUser.id, provider });
  }
  const user = await User.getUserWithRoles(email.toLowerCase());
  return user;
};

/**
 * Login user.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.getUserWithRoles(email.toLowerCase());

  if (!user) {
    throw new Unauthorized('Invalid email or password');
  }
  if (getHash(password) !== user.password) {
    throw new Unauthorized('Invalid email or password');
  }

  res.json(response({ data: getTokenResponse(user) }));
};

/**
 * Create new account.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const signup = async (req, res) => {
  const { name, email, password, phone } = req.body;

  const dbUser = await User.getOneByCondition({ email: email.toLowerCase() });

  if (dbUser) {
    throw new BadRequest('Email already in use');
  }

  req.body.email = email.toLowerCase();

  const passwordHash = getHash(password);

  const user = await User.createOne({
    name,
    email: email.toLowerCase(),
    password: passwordHash,
    phone,
    active: true,
  });

  return res.json(response({ data: getTokenResponse(user) }));
};

/**
 * Login using Facebook.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const facebookLogin = async (req, res) => {
  const { accessToken } = req.body;

  fetch(`https://graph.facebook.com/me?access_token=${accessToken}&fields=email,name,id`)
    .then((ress) => ress.json())
    .then(async (userData) => {
      const { name, email } = userData;

      const user = await socialLogin(email, name, 'Facebook');
      res.send(response({ data: getTokenResponse(user) }));
    });
};

/**
 * Login using Google.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const googleLogin = async (req, res) => {
  const { idToken } = req.body;

  const ticket = await client.verifyIdToken({
    idToken,
    audience: GOOGLE_CLEINT_ID,
  });

  const { name, email } = await ticket.getPayload();

  const user = await socialLogin(email, name, 'Google');

  res.json(response({ data: getTokenResponse(user) }));
};

module.exports = { signup, login, googleLogin, facebookLogin };
