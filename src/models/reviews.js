const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class Reviews extends BaseModel {
  static associate({ RatingCriteria, User }) {
    this.belongsToMany(RatingCriteria, {
      through: 'ReviewRatings',
      foreignKey: 'review_id',
      as: 'ratings',
    });
    this.belongsTo(User, { as: 'reviewedUser', foreignKey: 'userId' });
    this.belongsTo(User, { as: 'reviewer', foreignKey: 'reviewerId' });
  }
}

/**
 * @type {typeof Reviews}
 */
module.exports = (sequelize, DataTypes) => {
  Reviews.init(
    {
      id: {
        description: 'Primary key',
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      reviewerId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'reviewer_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      review: {
        type: DataTypes.STRING(500),
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'Reviews',
      tableName: 'reviews',
    }
  );
  return Reviews;
};
