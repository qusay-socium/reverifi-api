const { NotFound } = require('lib/errors');
const {
  usersInfo,
  userInfoById,
  createUserInfo,
  updateUserInfo,
  destroyUserInfo,
} = require('services/user-info');
const response = require('utils/response');

/**
 * Create new user info.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const postUserInfo = async (req, res) => {
  req.body.userId = req.user.id;

  const data = await createUserInfo(req.body);

  res.json(response(data));
};

/**
 * Update user info.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const patchUserInfo = async (req, res) => {
  const data = await updateUserInfo(req.body, req.user.id);

  res.json(response(data));
};

/**
 * Get user info by id.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getUserInfo = async (req, res) => {
  const { id } = req.params;

  const data = await userInfoById(id);
  if (!data) throw new NotFound();

  res.json(response(data));
};

/**
 * Get users info .
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getUsersInfo = async (req, res) => {
  const data = await usersInfo();

  res.json(response(data));
};

/**
 * Delete user info  by id.
 * Check if the user have same user info.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const deleteUserInfo = async (req, res) => {
  const valid = await destroyUserInfo(req.user.id);
  if (!valid) throw new NotFound();

  res.json(response(null, 200, 'User information deleted.'));
};

module.exports = { deleteUserInfo, getUsersInfo, getUserInfo, postUserInfo, patchUserInfo };
