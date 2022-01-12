const { Listing } = require('models');
const { NotFound } = require('lib/errors');
const response = require('utils/response');

/**
 * Remove password field from listing owner object.
 *
 * @param {Object} listing Listing object.
 */
const removeOwnerPassword = (listing) => {
  if (listing && listing.owner) {
    delete listing.owner.password;
  }
};

/**
 * Get all listings.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getAllListings = async (req, res) => {
  const data = await Listing.getAllWithOwner();

  data.forEach(removeOwnerPassword);

  res.json(response({ data }));
};

/**
 * Create new listing.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const createListing = async (req, res) => {
  req.body.ownerId = req.user.id;

  const data = await Listing.createOne(req.body);

  res.json(response({ data }));
};

/**
 * Update listing.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const updateListing = async (req, res) => {
  const data = await Listing.updateByOwnerId(req.user.id, req.body);
  if (!data) {
    throw new NotFound();
  }

  res.json(response({ data }));
};

/**
 * Delete listing by id.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const deleteListing = async (req, res) => {
  const valid = await Listing.deleteByOwnerId(req.user.id);
  if (!valid) {
    throw new NotFound();
  }

  res.json(response());
};

/**
 * Get listing by ID.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getListingById = async (req, res) => {
  const { id } = req.params;

  const data = await Listing.getOneWithOwner(id);
  if (!data) {
    throw new NotFound();
  }

  removeOwnerPassword(data);

  res.json(response({ data }));
};

module.exports = { getAllListings, updateListing, createListing, getListingById, deleteListing };
