const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class ClaimListingAddress extends BaseModel {
  static associate({ Listing }) {
    this.belongsTo(Listing, { as: 'claimedListing', foreignKey: 'listingId' });
  }
}

/**
 * @type {typeof ClaimListingAddress}
 */
module.exports = (sequelize, DataTypes) => {
  ClaimListingAddress.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      listingId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'listing_id',
        references: {
          model: 'listings',
          key: 'id',
        },
      },
      documentUrl: {
        type: DataTypes.STRING,
        field: 'document_url',
      },
      status: {
        type: DataTypes.STRING,
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'ClaimListingAddress',
      tableName: 'claim_listing_address',
    }
  );
  return ClaimListingAddress;
};
