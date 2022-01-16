const { NotFound } = require('lib/errors');
const { UserInfo } = require('models');
const response = require('utils/response');

/**
 * Remove password field from user info user object.
 *
 * @param {Object} userInfo User info object.
 */
const removeUserPassword = (userInfo) => {
  if (userInfo && userInfo.user) {
    delete userInfo.user.password;
  }
};

/**
 * Get user info.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getAllUserInfo = async (req, res) => {
  const data = await UserInfo.getAllWithUserAndCompany();

  data.forEach(removeUserPassword);

  res.json(response({ data }));
};

/**
 * Create new user info.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const createUserInfo = async (req, res) => {
  req.body.userId = req.user.id;

  const data = await UserInfo.createOne(req.body);

  res.json(response({ data }));
};

/**
 * Update user info.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const updateUserInfo = async (req, res) => {
  const data = await UserInfo.updateByUserId(req.user.id, req.body);

  res.json(response({ data }));
};

/**
 * Delete user info by id.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const deleteUserInfo = async (req, res) => {
  const valid = await UserInfo.deleteByUserId(req.user.id);
  if (!valid) {
    throw new NotFound();
  }

  res.json(response());
};

/**
 * Get user info by id.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getUserInfoById = async (req, res) => {
  const { id } = req.params;

  const data = await UserInfo.getOneWithUserAndCompany(id);
  if (!data) {
    throw new NotFound();
  }

  removeUserPassword(data);

  res.json(response({ data }));
};

module.exports = {
  getAllUserInfo,
  createUserInfo,
  updateUserInfo,
  deleteUserInfo,
  getUserInfoById,
};
