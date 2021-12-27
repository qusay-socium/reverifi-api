const { NotFound } = require('lib/errors');
const response = require('utils/response');

const { addList, listings, listById, removeListById, updateList } = require('../services/listing');

/**
 * Create new list.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const postListing = async (req, res) => {
  req.body.ownerId = req.user.id;

  const data = await addList(req.body);

  res.json(response(data));
};

/**
 * Get lists.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getListings = async (req, res) => {
  const data = await listings();

  res.json(response(data));
};

/**
 * Get list by id.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getListing = async (req, res) => {
  const { id } = req.params;

  const data = await listById(id);
  if (!data) throw new NotFound();

  res.json(response(data));
};

/**
 * Update  list by id.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const patchList = async (req, res) => {
  const userId = req.user.id;

  const data = await updateList(req.body, userId);
  if (!data) throw new NotFound();

  res.json(response(data));
};
/**
 * Delete list by id.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const deleteListing = async (req, res) => {
  const valid = await removeListById(req.user.id);
  if (!valid) throw new NotFound();

  res.json(response(null, 200, 'List deleted'));
};

module.exports = { patchList, deleteListing, getListing, getListings, postListing };
