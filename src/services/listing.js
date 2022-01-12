const { Listing, User } = require('models');

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
 * @return {Promise<Object>}
 */
const listings = async () => {
  const data = await Listing.findAndCountAll({
    include: [{ model: User, as: 'owner' }],
  });

  return data;
};

/**
 * Get listings.
 * Handle pagination (3 listings per page).
 *
 * @return {Promise<Object>}
 */
const listingsFeature = async (offset, limit = 3) => {
  const data = await Listing.findAndCountAll({
    include: [
      { model: User, as: 'owner' },
      { model: User, as: 'agent' },
    ],
    distinct: true,
    offset,
    limit,
  });

  return { ...data, count: data.rows.length };
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

module.exports = { listingsFeature, updateList, removeListById, addList, listings, listById };
