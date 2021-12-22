const { UserInfo, Company } = require('../models');

/**
 * Insert new user info.
 *
 * @param {Object} values
 *
 * @return {Promise<Object>}
 */
const createUserInfo = async values => {
  const data = await UserInfo.create(values);
  console.log('daaataaaa', data);
  return data.dataValues;
};

/**
 * Get user info by id.
 *
 * @param {Object} values
 *
 * @return {Promise<Object>}
 */
const userInfoById = async id => {
  const data = await UserInfo.findOne({
    include: [
      {
        model: Company,
      },
    ],
    where: { id },
  });
  return data.dataValues;
};

/**
 * Get users info.
 *
 * @param {Object} values
 *
 * @return {Promise<Object>}
 */
const usersInfo = async id => {
  const data = await UserInfo.findAndCountAll({
    include: [
      {
        model: Company,
      },
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
const updateUserInfo = async (values, id) => {
  const data = await UserInfo.update(values, { where: { id }, returning: true });
  return data;
};

/**
 * delete user-info.
 *
 * @param {Object} values
 * @param {number} id
 *
 * @returns {Promise<[number, Object[]]>} Updated user-info data.
 */
const destroyUserInfo = async id => {
  await UserInfo.destroy({ where: { id } });
};

module.exports = { destroyUserInfo, usersInfo, createUserInfo, userInfoById, updateUserInfo };
