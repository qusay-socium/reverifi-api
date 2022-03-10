const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class Invitations extends BaseModel {
  static associate({ InvitationType, User }) {
    this.belongsTo(InvitationType, { as: 'invitationType', foreignKey: 'invitationTypeId' });
    this.belongsTo(User, { as: 'inviter', foreignKey: 'inviteBy' });
    this.belongsTo(User, { as: 'invitedUser', foreignKey: 'invitedUserId' });
  }
}

/**
 * @type {typeof Invitations}
 */
module.exports = (sequelize, DataTypes) => {
  Invitations.init(
    {
      id: {
        description: 'Primary key',
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      inviteBy: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'invite_by',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      invitedUserId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'invited_user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      invitationTypeId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'invitation_type_id',
        references: {
          model: 'invitation_type',
          key: 'id',
        },
      },
      role: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'Invitations',
      tableName: 'invitations',
    }
  );
  return Invitations;
};
