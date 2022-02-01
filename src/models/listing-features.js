const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');

class ListingFeatures extends BaseModel {
  static associate({ Listing, Features }) {
    this.belongsTo(Listing, {
      foreignKey: 'listingId',
      as: 'listing',
    });
    this.belongsTo(Features, {
      foreignKey: 'featureId',
      as: 'features',
    });
  }
}

/**
 * @type {typeof ListingFeatures}
 */
module.exports = (sequelize, DataTypes) => {
  ListingFeatures.init(
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
      featureId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'feature_id',
        references: {
          model: 'features',
          key: 'id',
        },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        field: 'is_deleted',
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ListingFeatures',
      tableName: 'listing_features',
    }
  );
  return ListingFeatures;
};
