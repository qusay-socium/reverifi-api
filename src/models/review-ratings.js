const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');

class ReviewRatings extends BaseModel {
  static associate({ RatingCriteria, Reviews }) {
    this.belongsTo(Reviews, {
      foreignKey: 'review_id',
      as: 'review',
    });
    this.belongsTo(RatingCriteria, {
      foreignKey: 'rating_criteria_id',
      as: 'rating',
    });
  }
}

/**
 * @type {typeof ReviewRatings}
 */
module.exports = (sequelize, DataTypes) => {
  ReviewRatings.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      reviewId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'review_id',
        references: {
          model: 'reviews',
          key: 'id',
        },
      },
      ratingCriteriaId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'rating_criteria_id',
        references: {
          model: 'rating_criteria',
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
      modelName: 'ReviewRatings',
      tableName: 'review_ratings',
    }
  );
  return ReviewRatings;
};
