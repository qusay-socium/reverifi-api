const { NotFound } = require('lib/errors');
const { UserInfo, UserRoles, User, Roles, Company } = require('models');
const response = require('utils/response');

/**
 * Create new user info.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const createUserInfo = async (req, res) => {
  req.body.userId = req.user.id;

  const data = await UserInfo.createOne(req.body);

  res.json(response({ data }));
};

/**
 * Update user info.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const updateUserInfo = async (req, res) => {
  const { id } = req.user;
  const { user, userInfo, company } = req.body;

  delete user.password;

  await User.updateByCondition({ id }, user);

  let dbCompany = {};

  if (company.name && company.email) {
    dbCompany = await Company.upsertOne({
      id: company.id,
      name: company.name,
      email: company.email,
      website: company.website,
    });
  }

  await UserInfo.updateByUserId(id, { ...userInfo, companyId: dbCompany.id || null });

  res.json(response());
};

/**
 * Delete user info by id.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const deleteUserInfo = async (req, res) => {
  const valid = await UserInfo.deleteByUserId(req.user.id);
  if (!valid) {
    throw new NotFound();
  }

  res.json(response());
};

/**
 * Get user info.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getUserInfo = async (req, res) => {
  const { id } = req.user;

  const data = await UserInfo.getOneByCondition(
    { userId: id },
    { include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 'company'] }
  );

  if (!data) {
    throw new NotFound();
  }
  res.json(response({ data }));
};

/**
 * Update user roles.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const updateUserRoles = async (req, res) => {
  const { roles } = req.body;
  const userId = req.user.id;

  await UserRoles.deleteByCondition({ userId });

  if (roles.length) {
    await UserRoles.createAll(roles.map((role) => ({ userId, roleId: role })));
  }

  res.json(response());
};

/**
 * Get user roles.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getUserRoles = async (req, res) => {
  const userId = req.user.id;

  const data = (
    await User.getOne(userId, {
      include: {
        model: Roles,
        as: 'roles',
        attributes: ['id', 'role'],
        through: { attributes: [] },
      },
    })
  ).roles;

  res.json(response({ data }));
};

module.exports = {
  createUserInfo,
  updateUserInfo,
  deleteUserInfo,
  getUserInfo,
  updateUserRoles,
  getUserRoles,
};
