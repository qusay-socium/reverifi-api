const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class Features extends BaseModel {
  static associate({ Listing }) {
    this.belongsToMany(Listing, {
      through: 'ListingFeatures',
      foreignKey: 'feature_id',
      as: 'features',
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
      feature: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
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
