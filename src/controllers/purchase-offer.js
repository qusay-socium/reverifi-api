const { PurchaseOffer, Listing, User } = require('models');
const { Op } = require('sequelize');
const response = require('utils/response');

/**
 * Create purchase offer.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const createPurchaseOffer = async (req, res) => {
  const data = req.body;

  await PurchaseOffer.createOne(data);

  res.json(response());
};

/**
 * Get all purchase offers.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getAllPurchaseOffers = async (req, res) => {
  const { id } = req.user;

  const results = await Listing.getAllByCondition(
    {
      [Op.or]: [{ agentId: id }, { ownerId: id }],
    },
    {
      include: [
        {
          model: PurchaseOffer,
          as: 'listingOffer',
          include: [
            {
              model: User,
              as: 'offeredUser',
              attributes: ['id', 'name', 'email', 'phone'],
            },
          ],
          attributes: ['id', 'attachments', 'price'],
        },
      ],
      attributes: ['id', 'price', 'address'],
    }
  );

  res.json(response({ data: results }));
};

module.exports = {
  createPurchaseOffer,
  getAllPurchaseOffers,
};
