const {
  SavedUsersListings,
  SocialStatistics,
  Listing,
  User,
  UserInfo,
  ListingType,
  PropertyType,
} = require('models');
const response = require('utils/response');

/**
 * get user or listing Social Statistics
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getSavedUsersOrListings = async (req, res) => {
  const { userId, listingId } = req.query;
  const savedBy = req.user.id;

  const data = await SavedUsersListings.getOneByCondition({
    userId: userId || null,
    listingId: listingId || null,
    savedBy,
  });

  res.json(response({ data }));
};

/**
 * save user or listing
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const saveUserOrListing = async (req, res) => {
  const { userId, listingId } = req.body;
  const savedBy = req.user.id;

  const saved = await SavedUsersListings.getOneByCondition({
    userId: userId || null,
    listingId: listingId || null,
    savedBy,
  });

  if (!saved) {
    await SavedUsersListings.createOne({
      userId: userId || null,
      listingId: listingId || null,
      savedBy,
    });

    const social = await SocialStatistics.getOneByCondition({
      userId: userId || null,
      listingId: listingId || null,
    });

    if (!social) {
      await SocialStatistics.createOne({
        userId: userId || null,
        listingId: listingId || null,
        saves: 1,
      });
    } else {
      await SocialStatistics.increment(
        { saves: 1 },
        { where: { userId: userId || null, listingId: listingId || null } }
      );
    }
  } else {
    await SavedUsersListings.deleteByCondition({
      userId: userId || null,
      listingId: listingId || null,
      savedBy,
    });

    await SocialStatistics.decrement(
      { saves: 1 },
      { where: { userId: userId || null, listingId: listingId || null } }
    );
  }

  res.json(response());
};

/**
 * view or share user or listing
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const viewOrShareUserOrListing = async (req, res) => {
  const { userId, listingId, type } = req.body;

  const exist = await SocialStatistics.getOneByCondition({
    userId: userId || null,
    listingId: listingId || null,
  });

  if (!exist) {
    await SocialStatistics.createOne({
      userId: userId || null,
      listingId: listingId || null,
      [type]: 1,
    });
  } else {
    await SocialStatistics.increment(
      { [type]: 1 },
      { where: { userId: userId || null, listingId: listingId || null } }
    );
  }

  res.json(response());
};
/**
 * get user saved users or listings
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getUserSavedUsersOrListings = async (req, res) => {
  const { type, page, limit } = req.query;
  const savedBy = req.params.id;

  const filterCondition = type ? { [type === 'listing' ? 'userId' : 'listingId']: null } : {};

  const data = await SavedUsersListings.getPage(
    page,
    limit,
    {
      ...filterCondition,
      savedBy,
    },
    {
      include: [
        {
          model: Listing,
          as: 'savedListing',
          include: [
            { model: User, as: 'agent', include: [{ model: UserInfo, as: 'userInfo' }] },
            {
              model: ListingType,
              as: 'listingType',
              attributes: ['type'],
            },
            {
              model: PropertyType,
              as: 'propertyType',
              attributes: ['type'],
            },
          ],
        },
        {
          model: User,
          as: 'savedUser',
          attributes: { exclude: ['password'] },
          include: [{ model: UserInfo, as: 'userInfo' }, 'roles'],
        },
      ],
    }
  );

  res.json(response({ data }));
};
module.exports = {
  getSavedUsersOrListings,
  saveUserOrListing,
  viewOrShareUserOrListing,
  getUserSavedUsersOrListings,
};
