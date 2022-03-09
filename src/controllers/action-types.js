const { ActionTypes } = require('models');
const response = require('utils/response');
const { NotFound } = require('lib/errors');

/**
 * Get all action types.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getActionTypes = async (req, res) => {
  const data = await ActionTypes.getAll();

  res.json(response({ data }));
};

/**
 * Get all action types.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getActionTypeById = async (req, res) => {
  const { id } = req.params;

  const actionType = await ActionTypes.getOne(id);

  if (!actionType) {
    throw new NotFound();
  }

  res.json(response(actionType));
};

/**
 * Create new action type.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const createActionType = async (req, res) => {
  const data = await ActionTypes.createOne(req.body);

  res.json(response({ data }));
};

/**
 * Update action type.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const updateActionType = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const actionType = await ActionTypes.getOne(id);

  if (!actionType) {
    throw new NotFound();
  }

  const updatedActionType = await ActionTypes.updateOne(id, data);

  res.json(response({ updatedActionType }));
};

/**
 * Delete action type by id.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const deleteActionType = async (req, res) => {
  const { id } = req.params;
  const actionType = await ActionTypes.getOne(id);

  if (!actionType) {
    throw new NotFound();
  }

  await ActionTypes.deleteByCondition({ id });

  res.json(response());
};

module.exports = {
  createActionType,
  getActionTypes,
  getActionTypeById,
  updateActionType,
  deleteActionType,
};
