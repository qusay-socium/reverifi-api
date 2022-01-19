const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');

class ListingFeatures extends BaseModel {
  /**
   * Insert bulk.
   *
   * @param {Array} listingFeaturesId listingId & featureId.
   *
   * @return {Promise<Object[]>} Listing & features id.
   */
  static async createGroupe(listingFeaturesId) {
    const result = await this.bulkCreate(listingFeaturesId);
    return result;
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
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: null,
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
