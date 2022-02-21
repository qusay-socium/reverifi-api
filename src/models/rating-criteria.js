const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class RatingCriteria extends BaseModel {
  static associate({ Reviews }) {
    this.belongsToMany(Reviews, {
      through: 'ReviewRatings',
      foreignKey: 'rating_criteria_id',
      as: 'ratings',
    });
  }
}

/**
 * @type {typeof RatingCriteria}
 */
module.exports = (sequelize, DataTypes) => {
  RatingCriteria.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      criteria: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'RatingCriteria',
      tableName: 'rating_criteria',
    }
  );
  return RatingCriteria;
};
