const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { getUser, createUser, updateUser } = require('../services/user');
const { Authentication } = require('../middleware/error-handler');
const response = require('../utils/response');

/**
 * Basic authentication.
 *
 * @param {express.Request}  req Email & Password.
 * @param {express.Response} res
 *
 * @return {Object} User information's with token.
 */
async function login(req, res) {
  const { email, password } = req.body;
  console.log('00000000000000000000');
  const userData = await getUser(email);
  console.log(userData, '0000000');

  if (!userData) throw new Authentication('Invalid Email.');

  const valid = await bcrypt.compare(password, userData.password);
  if (valid) {
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

    const JWT = jwt.sign(signedUser, process.env.SECRET);
    userData.dataValues.token = JWT;

    res.json(response(userData));
  } else {
    throw new Authentication('Invalid Password.');
  }
}

/**
 * Create new account.
 *
 * @param {express.Request}  req Username, Email & password.
 * @param {express.Response} res
 *
 * @return {Object} Username, Email & Token.
 */
async function signup(req, res) {
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashPassword;

  const user = await createUser(req.body);

  res.json(response(user));
}

/**
 * Update user info depend on the request.
 *
 * @param {express.Request}  req Id, username, bio, email & password.
 * @param {express.Response} res
 *
 * @return {Object} New user data.
 */
async function putUser(req, res) {
  const [row, data] = await updateUser(req.body, req.user.id);
  res.json(response([row, ...data]));
}

module.exports = { signup, login, putUser };
