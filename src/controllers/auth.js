const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Unauthorized } = require('lib/errors');
const { secret } = require('config/config');
const { getUser, createUser } = require('services/user');
const response = require('utils/response');

/**
 * Login user.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const login = async (req, res) => {
  const { email, password } = req.body;
  const userData = await getUser(email);

  if (!userData) {
    throw new Unauthorized('Invalid email or password');
  }

  const valid = await bcrypt.compare(password, userData.password);
  if (!valid) {
    throw new Unauthorized('Invalid email or password');
  }

  const signedUser = {
    id: userData.id,
    email: userData.email,
    name: userData.name,
    phone: userData.phone,
    info: userData.userInfo
      ? {
          aboutMe: userData.userInfo.aboutMe,
          languages: userData.userInfo.languages,
          serviceAreas: userData.userInfo.serviceAreas,
          contact: userData.userInfo.contact,
          address: userData.userInfo.address,
          website: userData.userInfo.website,
          socials: userData.userInfo.socials,
          companyId: userData.userInfo.companyId,
        }
      : undefined,
  };

  const JWT = jwt.sign(signedUser, secret);
  userData.dataValues.token = JWT;

  res.json(response(userData));
};

/**
 * Create new account.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const signup = async (req, res) => {
  console.log(req.body)
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashPassword;
  const user = await createUser(req.body);

  res.json(response(user));
};

module.exports = { signup, login };
