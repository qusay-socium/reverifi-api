const fetch = require('node-fetch');
const { OAuth2Client } = require('google-auth-library');
const { checkSchema } = require('express-validator');

const { baseUrl } = require('config/config');
const { User, LoginProviders } = require('models');
const { Unauthorized, BadRequest, NotFound } = require('lib/errors');
const response = require('utils/response');
const cipher = require('utils/cipher');

// TODO: move to env var
const GOOGLE_CLEINT_ID = '136239126169-7ffbg6nhe5uno7p0ng4kvbld4mak9dph.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLEINT_ID);
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

const sendResetPasswordValidator = checkSchema(
  {
    email: {
      notEmpty: { errorMessage: 'email is required', bail: true },
      isEmail: { errorMessage: 'email should be valid format email', bail: true },
    },
  },
  ['body']
);

const resetPasswordValidator = checkSchema(
  {
    password: {
      notEmpty: { errorMessage: 'password is required', bail: true },
      matches: {
        if: (value) => !passwordRegex.test(value),
        errorMessage:
          'password should be at least 8 characters and contain 1' +
          'upper and lower case letter and 1 number and 1 special case character',
        bail: true,
      },
    },
  },
  ['body']
);

/**
 * Get token response after login or signup.
 *
 * @param {Object} user User data.
 *
 * @return {Object} Object contain the token.
 */
const getTokenResponse = ({ id, email, name, phone, roles, points, createdAt }) => ({
  token: cipher.getJwtToken({ id, email, name, phone, roles, points, createdAt }),
});

/**
 * Wheather is user social registered.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const isSocialUser = async (req, res) => {
  const { userId } = req.body;

  const isRegistered = await LoginProviders.getOneByCondition({ userId });

  res.json({
    data: { isRegistered: !!isRegistered },
  });
};

/**
 * Social Login.
 *
 * @param {String} email User email.
 * @param {String} name User name.
 * @param {String} provider User register provider.
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
  if (cipher.hash(password) !== user.password) {
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

  const passwordHash = cipher.hash(password);

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
 * Change user password.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const changePassword = async (req, res) => {
  const { currentPassword, id, newPassword } = req.body;

  const dbUser = await User.getOneByCondition({ id });

  if (dbUser.password !== cipher.hash(currentPassword)) {
    throw new Error('Password does not match');
  }

  await User.updateByCondition({ id }, { password: cipher.hash(newPassword) });

  res.json(response());
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
/**
 * Send reset password link to the user.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const sendResetPasswordLink = async (req, res) => {
  const user = await User.getOneByCondition({ email: req.body.email });
  if (!user) {
    throw new NotFound('User not found');
  }

  const encryptedToken = cipher.encrypt(
    cipher.getJwtToken({ email: user.email, id: user.id }, 1800)
  );

  // TODO: send the link via email
  res.json(response({ data: { link: `${baseUrl}/api/auth/reset-password/${encryptedToken}` } }));
};

/**
 * Reset user password.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const resetUserPassword = async (req, res) => {
  const decryptedToken = cipher.decrypt(req.params.token);

  if (!cipher.verifyJwtToken(decryptedToken)) {
    throw new BadRequest('invalid or expired link');
  }

  const { id } = cipher.decodeJwtToken(decryptedToken);

  await User.updateOne(id, { password: cipher.hash(req.body.password) });

  res.json(response());
};

module.exports = {
  changePassword,
  facebookLogin,
  googleLogin,
  isSocialUser,
  login,
  resetPasswordValidator,
  resetUserPassword,
  sendResetPasswordLink,
  sendResetPasswordValidator,
  signup,
};
