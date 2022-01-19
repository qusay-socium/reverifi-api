const { Listing, ListingFeatures } = require('models');
const { NotFound, Unauthorized, InternalError } = require('lib/errors');
const response = require('utils/response');

/**
 * Remove password field from listing owner and agent object.
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
  const data = await Listing.getAllWithRelations(req.user.id);

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
  const { isAgent, isOwner, features, ...data } = req.body;
  if (isAgent) {
    data.agentId = req.user.id;
  }
  if (isOwner) {
    data.ownerId = req.user.id;
  }
  const listing = await Listing.createOne(data);

  if (features.length) {
    const listingFeatures = features.map((feature) => {
      return { featureId: feature, listingId: listing.id };
    });

    await ListingFeatures.createGroupe(listingFeatures);
  }
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
  const { isAgent, isOwner, features, ...data } = req.body;

  if (isAgent) {
    data.agentId = req.user.id;
  } else {
    data.agentId = null;
  }
  if (isOwner) {
    data.ownerId = req.user.id;
  } else {
    data.ownerId = null;
  }

  const listing = await Listing.getOne(id);
  if (!listing || !(listing.ownerId === req.user.id || listing.agentId === req.user.id)) {
    throw new NotFound();
  }

  if (features) {
    await ListingFeatures.deleteByCondition({ listingId: id });

    if (features.length) {
      const listingFeaturesId = features.map((feature) => {
        return { featureId: feature, listingId: listing.id };
      });

      await ListingFeatures.createGroupe(listingFeaturesId);
    }
  }

  const updatedListing = await Listing.updateByCondition({ id }, data);

  res.json(response({ updatedListing }));
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

  if (!listing || !(listing.ownerId === req.user.id || listing.agentId === req.user.id)) {
    throw new NotFound();
  }

  await Listing.deleteByCondition({ id });

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

  if (!data || !(data.ownerId === req.user.id || data.agentId === req.user.id)) {
    throw new NotFound();
  }

  removeOwnerAndAgentPassword(data);

  res.json(response({ data }));
};

module.exports = { getAllListings, updateListing, createListing, getListingById, deleteListing };
