const { Listing, User } = require('models');
const { Op } = require('sequelize');
/**
 * Insert new list.
 *
 * @param {Object} values New list data.
 *
 * @return {Promise<Object>}
 */
const addList = async (values) => {
  const data = await Listing.create(values);

  return data.dataValues;
};

/**
 * Get listings.
 *
 * @param {String} location  Query Param(Optional) , could be address , country , city , street , zipcode
 *
 * @return {Promise<Object>}
 */
const listings = async ({ location }) => {
  let filter = {};
  if (location)
    filter = {
      [Op.or]: [
        {
          address: {
            [Op.iLike]: `%${location}%`,
          },
        },
        {
          city: {
            [Op.iLike]: `%${location}%`,
          },
        },
        {
          street: {
            [Op.iLike]: `%${location}%`,
          },
        },
        {
          country: {
            [Op.iLike]: `%${location}%`,
          },
        },
        {
          zip_code: {
            [Op.iLike]: `%${location}%`,
          },
        },
      ],
    };

  const data = await Listing.findAndCountAll({
    where: filter,
    include: [
      {
        model: User,
        as: 'owner',
        attributes: { exclude: ['password'] },
      },
    ],
  });

  return data;
};

/**
 * Get List by id.
 *
 * @param {String} id UUID for list.
 *
 * @return {Promise<Object>}
 */
const listById = async (id) => {
  const data = await Listing.findOne({
    include: [{ model: User, as: 'userOwner' }],
    where: { id },
  });

  return data;
};

/**
 * Delete List by id.
 *
 * @param {String} ownerId UUID for the user who own the list.
 *
 * @return {Promise<Object>}
 */
const removeListById = async (ownerId) => {
  const data = await Listing.destroy({ where: { ownerId }, returning: true });

  return data;
};

/**
 * Update  list.
 *
 * @param {Object} values List data for updating list.
 * @param {String} ownerId UUID for the user who own the list.
 *
 * @return {Promise<Object>}
 */
const updateList = async (values, ownerId) => {
  const createCompany = await Listing.update(values, { where: { ownerId }, returning: true });

  return createCompany;
};

module.exports = { updateList, removeListById, addList, listings, listById };
