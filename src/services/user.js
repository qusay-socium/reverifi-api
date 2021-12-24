const { User } = require('models');

/**
 * Inserting new user.
 *
 * @param {Object} values User data.
 *
 * @returns {Promise<Object>}
 */
const createUser = async (values) => {
  const user = await User.create(values);

  return user.dataValues;
};

/**
 * Get user.
 *
 * @param {String} email Email.
 *
 * @returns {Promise<Object>}
 */
const getUser = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

/**
 * Update user depend on request.
 *
 * @param {Object} values User data for updating.
 * @param {String} id     UUID for user.
 *
 * @returns {Promise<[number, Object[]]>}
 */
const updateUser = async (values, id) => {
  const user = await User.update(values, { where: { id }, returning: true });

  return user;
};

module.exports = { updateUser, createUser, getUser };
