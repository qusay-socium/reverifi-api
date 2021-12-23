const { Listing, User } = require('../models');

/**
 * Insert new list.
 *
 * @param {Object} values
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
 * @param {Object} values
 *
 * @return {Promise<Object>}
 */
const listings = async (values) => {
  const data = await Listing.findAndCountAll({
    include: [{ model: User, as: 'userOwner' }],
  });
  return data;
};

/**
 * Get List by id.
 *
 * @param {Object} values
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
 * @param {Object} values
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
 * @param {Object} values
 *
 * @return {Promise<Object>}
 */
const updateList = async (values, ownerId) => {
  const createCompany = await Listing.update(values, { where: { ownerId }, returning: true });

  return createCompany;
};

module.exports = { updateList, removeListById, addList, listings, listById };
