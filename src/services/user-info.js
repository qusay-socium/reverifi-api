const { UserInfo, Company, User } = require('models');

/**
 * Insert new user info.
 *
 * @param {Object} values User-info data for creating user-info.
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
 * @param {String} id UUID for user-info.
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
 * @return {Promise<Object>}
 */
const usersInfo = async () => {
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
 * @param {Object} values User-info data for updating user-info.
 * @param {String} id     UUID for user.
 *
 * @returns {Promise<[number, Object[]]>}
 */
const updateUserInfo = async (values, userId) => {
  const data = await UserInfo.update(values, { where: { userId }, returning: true });

  return data;
};

/**
 * Delete user-info.
 *
 * @param {String} userId UUID for user.
 *
 * @returns {Promise<[number, Object[]]>}
 */
const destroyUserInfo = async (userId) => {
  const data = await UserInfo.destroy({ where: { userId }, returning: true });

  return data;
};

module.exports = { destroyUserInfo, usersInfo, createUserInfo, userInfoById, updateUserInfo };
