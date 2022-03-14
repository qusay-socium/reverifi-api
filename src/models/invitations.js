const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class Invitations extends BaseModel {
  static associate({ User, Listing }) {
    this.belongsTo(Listing, { as: 'invitedListing', foreignKey: 'listingId' });
    this.belongsTo(User, { as: 'inviter', foreignKey: 'inviteById' });
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
      inviteById: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'invite_by_id',
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
      listingId: {
        type: Sequelize.UUID,
        field: 'listing_id',
        references: {
          model: 'listings',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
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
