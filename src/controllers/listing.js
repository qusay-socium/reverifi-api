const { Listing, ListingFeatures, User, UserInfo } = require('models');
const { NotFound, Unauthorized, InternalError } = require('lib/errors');
const response = require('utils/response');

/**
 * Get all listings.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getAllListings = async (req, res) => {
  const data = await Listing.getAllWithRelations(req.user.id);

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
    await ListingFeatures.createAll(
      features.map((feature) => ({
        featureId: feature,
        listingId: listing.id,
      }))
    );
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

  data.agentId = isAgent ? req.user.id : undefined;
  data.ownerId = isOwner ? req.user.id : undefined;

  const listing = await Listing.getOne(id);
  if (!listing || !(listing.ownerId === req.user.id || listing.agentId === req.user.id)) {
    throw new NotFound();
  }

  if (features) {
    await ListingFeatures.deleteByCondition({ listingId: id });

    if (features.length) {
      await ListingFeatures.createAll(
        features.map((feature) => ({ featureId: feature, listingId: listing.id }))
      );
    }
  }

  const updatedListing = await Listing.updateOne(id, data);

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

  res.json(response({ data }));
};

/**
 * Get featured listings.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getFeaturedListings = async (req, res) => {
  const data = await Listing.getAll({
    attributes: [
      'id',
      'images',
      'price',
      'address',
      'listingType',
      'bedrooms',
      'fullBathrooms',
      'propertyType',
      'createdAt',
    ],
    limit: 6,
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        as: 'agent',
        attributes: ['id'],
        include: [{ model: UserInfo, as: 'userInfo', attributes: ['image'] }],
      },
    ],
  });

  data.forEach(removeOwnerAndAgentPassword);

  res.json(response({ data }));
};

module.exports = {
  getAllListings,
  updateListing,
  createListing,
  getListingById,
  deleteListing,
  getFeaturedListings,
};
