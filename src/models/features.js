const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');

class Features extends BaseModel {
  static associate({ Listing }) {
    this.belongsToMany(Listing, {
      through: 'ListingFeatures',
      foreignKey: 'featureId',
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
        unique: true,
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
      modelName: 'Features',
      tableName: 'features',
    }
  );
  return Features;
};
