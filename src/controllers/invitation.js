const { InvitationType, Invitations, User, Listing, UserInfo } = require('models');
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
        model: InvitationType,
        as: 'invitationType',
        include: [{ model: Listing, as: 'invitedListing' }],
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
  const { userIdsAndRoles, listingId, model, name } = req.body;
  const inviteById = req.user.id;

  let invitationType = await InvitationType.getOneByCondition({ listingId });

  if (!invitationType) {
    invitationType = await InvitationType.createOne({ listingId, model, name });
  } else {
    // to update invited users
    await Invitations.deleteByCondition({ invitationTypeId: invitationType.id });
  }

  if (userIdsAndRoles.length) {
    await Invitations.createAll(
      userIdsAndRoles.map(({ invitedUserId, role }) => ({
        invitedUserId,
        role,
        inviteById,
        invitationTypeId: invitationType.id,
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
