const { Invitations, User, Listing, UserInfo } = require('models');
const response = require('utils/response');

/**
 * get invitations by type
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getInvitations = async (req, res) => {
  const { type } = req.params;
  const { id } = req.user;

  const condition = type === 'incoming' ? { invitedUserId: id } : { inviteById: id };

  const data = await Invitations.getAllByCondition(condition, {
    include: [
      {
        model: User,
        as: 'inviter',
        include: [{ model: UserInfo, as: 'userInfo', attributes: ['image'] }],
      },
      {
        model: User,
        as: 'invitedUser',
        include: [{ model: UserInfo, as: 'userInfo', attributes: ['image'] }],
      },
      {
        model: Listing,
        as: 'invitedListing',
      },
    ],
  });

  res.json(response({ data }));
};

/**
 * Add invitation
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const addInvitation = async (req, res) => {
  const { userIdsAndRoles, listingId } = req.body;
  const inviteById = req.user.id;

  const invitationExist = await Invitations.getOneByCondition({ listingId });

  if (invitationExist) {
    // to update invited users
    await Invitations.deleteByCondition({ listingId });
  }

  if (userIdsAndRoles.length) {
    await Invitations.createAll(
      userIdsAndRoles.map(({ invitedUserId, role }) => ({
        invitedUserId,
        role,
        inviteById,
        listingId,
      }))
    );
  }

  res.json(response());
};

/**
 * update invitation
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const updateInvitation = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const invitedUserId = req.user.id;

  const invitationExist = await Invitations.getOneByCondition({ id, invitedUserId });

  if (invitationExist) {
    await Invitations.updateByCondition({ id, invitedUserId }, { status });
  }

  res.json(response());
};

module.exports = {
  getInvitations,
  addInvitation,
  updateInvitation,
};
