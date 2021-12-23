const { UserInfo, Company, User } = require('models');

/**
 * Insert new user info.
 *
 * @param {Object} values
 *
 * @return {Promise<Object>}
 */
const createUserInfo = async (values) => {
  const data = await UserInfo.create(values);
  return data.dataValues;
};

/**
 * Get user info by id.
 *
 * @param {Object} values
 *
 * @return {Promise<Object>}
 */
const userInfoById = async (id) => {
  const data = await UserInfo.findOne({
    include: [
      {
        model: Company,
        as: 'company',
      },
      { model: User, as: 'user' },
    ],
    where: { id },
  });

  return data;
};

/**
 * Get users info.
 *
 * @param {Object} values
 *
 * @return {Promise<Object>}
 */
const usersInfo = async (id) => {
  const data = await UserInfo.findAndCountAll({
    include: [
      {
        model: Company,
        as: 'company',
      },
      { model: User, as: 'user' },
    ],
  });
  return data;
};

/**
 * Update user-info.
 *
 * @param {Object} values
 * @param {number} id
 *
 * @returns {Promise<[number, Object[]]>} Updated user-info data.
 */
const updateUserInfo = async (values, userId) => {
  const data = await UserInfo.update(values, { where: { userId }, returning: true });
  return data;
};

/**
 * delete user-info.
 *
 * @param {Object} values
 * @param {number} id
 *
 * @returns {Promise<[number, Object[]]>} Deleted user-info data.
 */
const destroyUserInfo = async (userId) => {
  const data = await UserInfo.destroy({ where: { userId }, returning: true });
  return data;
};

module.exports = { destroyUserInfo, usersInfo, createUserInfo, userInfoById, updateUserInfo };
