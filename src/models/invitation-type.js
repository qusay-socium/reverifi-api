const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class InvitationType extends BaseModel {
  static associate({ Invitations, Listing }) {
    this.hasMany(Invitations, { as: 'invitationType', foreignKey: 'invitationTypeId' });
    this.belongsTo(Listing, { as: 'invitedListing', foreignKey: 'listingId' });
  }
}

/**
 * @type {typeof InvitationType}
 */
module.exports = (sequelize, DataTypes) => {
  InvitationType.init(
    {
      id: {
        description: 'Primary key',
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      listingId: {
        type: DataTypes.UUID,
        field: 'listing_id',
        references: {
          model: 'listings',
          key: 'id',
        },
      },
      model: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'InvitationType',
      tableName: 'invitation_type',
    }
  );
  return InvitationType;
};
