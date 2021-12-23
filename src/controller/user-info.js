const { NotFound } = require('lib/errors');
const {
  createUserInfo,
  updateUserInfo,
  getUserInfoById,
  userInfoById,
  usersInfo,
  destroyUserInfo,
} = require('../services/user-info');
const response = require('../utils/response');

/**
 * Create new user info.
 *
 * @param {express.Request}  req
 * @param {express.Response} res
 *
 * @return {Object}
 */
async function postUserInfo(req, res) {
  req.body.userId = req.user.id;
  const data = await createUserInfo(req.body);

  res.json(response(data));
}

/**
 * Update user info.
 *
 * @param {express.Request}  req
 * @param {express.Response} res
 *
 * @return {Object}
 */
async function patchUserInfo(req, res) {
  const userId = req.user.id;

  const data = await updateUserInfo(req.body, req.user.id);

  res.json(response(data));
}

/**
 * Get user info by id.
 *
 * @param {express.Request}  req
 * @param {express.Response} res
 *
 * @return {Object}
 */
async function getUserInfo(req, res) {
  const { id } = req.params;

  const data = await userInfoById(id);

  res.json(response(data));
}

/**
 * Get users info .
 *
 * @param {express.Request}  req
 * @param {express.Response} res
 *
 * @return {Object}
 */
async function getUsersInfo(req, res) {
  const data = await usersInfo();

  res.json(response(data));
}

/**
 * Delete user info  by id.
 * Check if the user have same user info.
 *
 * @param {express.Request}  req .
 * @param {express.Response} res
 *
 * @return {Object} Success message.
 */
async function deleteUserInfo(req, res) {
  const valid = await destroyUserInfo(req.user.id);
  if (valid) {
    res.json(response(null, 200, 'User information deleted.'));
  } else {
    throw new NotFound('Company not exist!');
  }
}
module.exports = { deleteUserInfo, getUsersInfo, getUserInfo, postUserInfo, patchUserInfo };
