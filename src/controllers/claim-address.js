const { Listing, ClaimListingAddress } = require('models');
const { NotFound } = require('lib/errors');
const response = require('utils/response');

/**
 * add or update listing claim
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const addListingClaim = async (req, res) => {
  const { status, documentUrl, listingId } = req.body;
  const createdBy = req.user.id;

  const exist = await ClaimListingAddress.getOneByCondition({ listingId, createdBy });

  if (!exist) {
    await ClaimListingAddress.createOne({
      listingId,
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
const getClaims = async (req, res) => {
  const { listingId } = req.query;
  const createdBy = req.user.id;

  const data = await ClaimListingAddress.getAllByCondition(
    { createdBy, ...(listingId ? { listingId } : {}) },
    {
      include: [{ model: Listing, as: 'claimedListing' }],
    }
  );

  if (!data) {
    throw new NotFound();
  }

  res.json(response({ data }));
};

module.exports = {
  addListingClaim,
  getClaims,
};