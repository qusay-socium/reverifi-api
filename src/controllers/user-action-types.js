const { UserActionTypes, ActionTypes, User } = require('models');
const response = require('utils/response');
const { NotFound } = require('lib/errors');

/**
 * Get all user action types.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getAllUserActionTypes = async (req, res) => {
  const data = await UserActionTypes.getAll();

  res.json(response({ data }));
};

/**
 * Get all user action types by user Id.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getUserActionTypesByUserId = async (req, res) => {
  const userId = req.params.id;

  const data = await UserActionTypes.getAllByCondition({ userId });

  res.json(response({ data }));
};

/**
 * Create new user action type.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const createUserActionType = async (req, res) => {
  const userId = req.user.id;

  const { actionTypeName } = req.body;

  const actionType = await ActionTypes.getOneByCondition({ type: actionTypeName });

  if (!actionType) {
    throw new NotFound('Action type not found');
  }

  const user = await User.getOne(userId);
  if (!user) {
    throw new NotFound('User not found');
  }

  const points = user.points + actionType.points;

  await User.updateOne(userId, { points });

  let data = await UserActionTypes.createOne({ userId, actionTypeId: actionType.id });

  data = { ...data, points: actionType.points };

  res.json(response({ data }));
};

module.exports = {
  createUserActionType,
  getAllUserActionTypes,
  getUserActionTypesByUserId,
};
