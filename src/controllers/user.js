const { NotFound } = require('lib/errors');
const { UserInfo, UserRoles, User, Roles, Company } = require('models');
const { Op } = require('sequelize');
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
    const companyExist = await Company.getOneByCondition({ id: company.id });

    if (!companyExist) {
      dbCompany = await Company.createOne({
        name: company.name,
        email: company.email,
        website: company.website,
      });
    } else {
      await Company.updateByCondition({ id: companyExist.id }, company);
      dbCompany = companyExist;
    }
  }

  const fetchedUserInfo = await UserInfo.getOneByCondition({ userId: id });

  if (!fetchedUserInfo) {
    await UserInfo.createOne({ ...userInfo, userId: id, companyId: dbCompany.id || null });
  } else {
    await UserInfo.updateByUserId(id, {
      ...userInfo,
      companyId: dbCompany.id || null,
    });
  }

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
    {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] }, include: ['roles'] },
        'company',
      ],
    }
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

/**
 * Get users by type.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getAgentUsersByType = async (req, res) => {
  const { type } = req.params;
  const { page, location, name } = req.query;

  let paginationOptions = {};
  if (+page) {
    const limit = 8;
    const offset = (+page - 1) * limit;

    paginationOptions = { limit, offset };
  }

  let locationCondition = {};
  if (location) {
    if (Number.isNaN(Number.parseInt(location, 10))) {
      locationCondition = { city: location };
    } else {
      locationCondition = { zipCode: location };
    }
  }

  const agents = await User.getAllByCondition(name ? { name } : {}, {
    attributes: ['id', 'name', 'email', 'phone'],
    ...paginationOptions,
    include: [
      {
        model: UserInfo,
        where: locationCondition,
        required: false,
        as: 'userInfo',
        attributes: ['image', 'city', 'country', 'zipCode'],
        include: [
          {
            model: Company,
            as: 'company',
            attributes: ['name'],
            required: false,
          },
        ],
      },
      {
        model: Roles,
        as: 'roles',
        attributes: ['id', 'role'],
        through: { attributes: [] },
        where: { role: { [Op.or]: ['Agent', type] } },
      },
    ],
  });

  // filter agent users only
  let data = agents;
  if (type !== 'Agent') {
    data = agents.filter((agent) => agent.roles.length > 1);
  }

  res.json(response({ data }));
};

module.exports = {
  createUserInfo,
  updateUserInfo,
  deleteUserInfo,
  getUserInfo,
  updateUserRoles,
  getUserRoles,
  getAgentUsersByType,
};
