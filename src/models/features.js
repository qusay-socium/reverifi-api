'use strict';
const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class Features extends BaseModel {
  static associate({ Listing }) {
    this.belongsToMany(Listing, {
      through: 'listingFeatures',
      foreignKey: 'featureId',
    });
  }
}

/**
 * @type {typeof Features}
 */
module.exports = (sequelize, DataTypes) => {
  Features.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'Features',
      tableName: 'features',
    }
  );
  return Features;
};
