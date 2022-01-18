'use strict';
const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class listingFeatures extends BaseModel {}

module.exports = (sequelize, DataTypes) => {
  listingFeatures.init(
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
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'listingFeatures',
      tableName: 'listing_features',
    }
  );
  return listingFeatures;
};
