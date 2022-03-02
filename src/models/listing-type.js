const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class ListingType extends BaseModel {
  static associate({ Listing }) {
    this.hasOne(Listing, { as: 'listingType', foreignKey: 'listingTypeId' });
  }
}

/**
 * @type {typeof ListingType}
 */
module.exports = (sequelize, DataTypes) => {
  ListingType.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'ListingType',
      tableName: 'listing_type',
    }
  );
  return ListingType;
};
