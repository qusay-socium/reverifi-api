const { Listing } = require('models');
const { NotFound, Unauthorized, InternalError } = require('lib/errors');
const response = require('utils/response');

/**
 * Remove password field from listing owner object.
 *
 * @param {Object} listing Listing object.
 */
const removeOwnerAndAgentPassword = (listing) => {
  if (listing && listing.owner) {
    delete listing.owner.password;
  }
  if (listing && listing.agent) {
    delete listing.agent.password;
  }
};

/**
 * Get all listings.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getAllListings = async (req, res) => {
  const data = await Listing.getAllWithOwnerAndAgent();

  data.forEach(removeOwnerAndAgentPassword);

  res.json(response({ data }));
};

/**
 * Create new listing.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const createListing = async (req, res) => {
  const { isAgent, isOwner, ...data } = req.body;
  if (isAgent) {
    data.agentId = req.user.id;
  }
  if (isOwner) {
    data.ownerId = req.user.id;
  }

  const listing = await Listing.createOne(data);

  res.json(response({ data: listing }));
};

/**
 * Update listing.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.getOne(id);
  if (!listing) {
    throw new NotFound();
  }

  if (!(listing.ownerId === req.user.id || listing.agentId === req.user.id)) {
    throw new Unauthorized();
  }

  const data = await Listing.updateByCondition({ id }, req.body);
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
  const { id } = req.params;
  const listing = await Listing.getOne(id);

  if (!listing) {
    throw new NotFound();
  }

  if (!(listing.ownerId === req.user.id || listing.agentId === req.user.id)) {
    throw new Unauthorized();
  }

  const valid = await Listing.deleteByCondition({ id });
  if (!valid) {
    throw new InternalError();
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

  const data = await Listing.getOneWithOwnerAndAgent(id);
  if (!data) {
    throw new NotFound();
  }

  removeOwnerAndAgentPassword(data);

  res.json(response({ data }));
};

module.exports = { getAllListings, updateListing, createListing, getListingById, deleteListing };
