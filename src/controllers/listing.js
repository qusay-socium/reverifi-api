const {
  Listing,
  ListingFeatures,
  User,
  UserInfo,
  PropertyType,
  ListingType,
  ClaimListingAddress,
} = require('models');
const { NotFound } = require('lib/errors');
const response = require('utils/response');

/**
 * Get all listings.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getAllListings = async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 30;
  const order = req.query.order || 'DESC';
  const { id } = req.params;

  const { data, count } = await Listing.getPageWithRelations(page, limit, order, id);

  res.json(response({ data, page, limit, count }));
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

  data.agentId = isAgent ? req.user.id : null;
  data.ownerId = isOwner ? req.user.id : null;

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

  if (!data) {
    throw new NotFound();
  }

  res.json(response({ data }));
};

/**
 * Search listings by city or zip code.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const searchListingsByCityOrZipCode = async (req, res) => {
  const data = await Listing.searchByCityOrZipCode(req.query);

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
      'bedrooms',
      'fullBathrooms',
      'createdAt',
      'homeArea',
      'lotArea',
      'tags',
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
      {
        model: PropertyType,
        as: 'propertyType',
        attributes: ['id', 'type'],
      },
      {
        model: ListingType,
        as: 'listingType',
        attributes: ['id', 'type'],
      },
    ],
  });
  res.json(response({ data }));
};

/**
 * Get listing by ID.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const updateListingTransaction = async (req, res) => {
  const { id, agentId, ownerId } = req.body;

  await Listing.updateOne(id, { agentId, ownerId });

  res.json(response());
};

/**
 * add or update listing images
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const addOrUpdateListingImages = async (req, res) => {
  const { id } = req.params;
  const { images } = req.body;

  const listing = await Listing.getOne(id);

  if (listing) {
    await Listing.updateOne(id, { images });
  }

  res.json(response());
};

/**
 * add or update listing claim
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const addListingClaim = async (req, res) => {
  const { id } = req.params;
  const { status, documentUrl } = req.body;
  const createdBy = req.user.id;

  const exist = await ClaimListingAddress.getOneByCondition({ listingId: id, createdBy });

  if (!exist) {
    await ClaimListingAddress.createOne({
      listingId: id,
      createdBy,
      documentUrl,
    });
  } else {
    let data = {};

    if (status) {
      data = { status };
    }

    if (documentUrl) {
      data = { ...data, documentUrl };
    }

    await ClaimListingAddress.updateOne(exist.id, data);
  }

  res.json(response());
};
/**
 * get listing claim
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getListingClaim = async (req, res) => {
  const { id } = req.params;
  const createdBy = req.user.id;

  const data = await ClaimListingAddress.getOneByCondition(
    { listingId: id, createdBy },
    { include: [{ model: Listing, as: 'claimedListing' }] }
  );

  if (!data) {
    throw new NotFound();
  }

  res.json(response({ data }));
};

module.exports = {
  getAllListings,
  updateListing,
  createListing,
  getListingById,
  deleteListing,
  searchListingsByCityOrZipCode,
  getFeaturedListings,
  updateListingTransaction,
  addOrUpdateListingImages,
  addListingClaim,
  getListingClaim,
};
