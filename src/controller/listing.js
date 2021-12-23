const { NotFound } = require('lib/errors');
const response = require('../utils/response');

const { addList, listings, listById, removeListById, updateList } = require('../services/listing');

/**
 * Create new list.
 *
 * @param {express.Request}  req
 * @param {express.Response} res
 *
 * @return {Object}
 */
async function postListing(req, res) {
  req.body.ownerId = req.user.id;
  const data = await addList(req.body);

  res.json(response(data));
}

/**
 * Get lists.
 *
 * @param {express.Request}  req
 * @param {express.Response} res
 *
 * @return {Object}
 */
async function getListings(req, res) {
  const data = await listings();

  res.json(response(data));
}

/**
 * Get list by id.
 *
 * @param {express.Request}  req
 * @param {express.Response} resd
 *
 * @return {Object}
 */
async function getListing(req, res) {
  const { id } = req.params;
  const data = await listById(id);

  res.json(response(data));
}

/**
 * Update  list by id.
 *
 * @param {express.Request}  req
 * @param {express.Response} res
 *
 * @return {Object}
 */
async function patchList(req, res) {
  const userId = req.user.id;

  const data = await updateList(req.body, userId);

  res.json(response(data));
}
/**
 * Delete list by id.
 *
 * @param {express.Request}  req
 * @param {express.Response} res
 *
 * @return {Object}
 */
async function deleteListing(req, res) {
  const valid = await removeListById(req.user.id);
  if (valid) {
    res.json(response(null, 200, 'List Deleted'));
  } else {
    throw new NotFound('List not exist!');
  }
}

module.exports = { patchList, deleteListing, getListing, getListings, postListing };
