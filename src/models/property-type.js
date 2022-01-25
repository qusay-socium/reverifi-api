const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class PropertyType extends BaseModel {
  static associate({ Listing }) {
    this.hasMany(Listing, { as: 'listing', foreignKey: 'property_type_id' });
  }
}

/**
 * @type {typeof PropertyType}
 */
module.exports = (sequelize, DataTypes) => {
  PropertyType.init(
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
      modelName: 'PropertyType',
      tableName: 'property_type',
    }
  );
  return PropertyType;
};
