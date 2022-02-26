const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');

class SocialStatistics extends BaseModel {
  static associate({ User, Listing }) {
    this.belongsTo(User, { as: 'userSocial', foreignKey: 'userId' });
    this.belongsTo(Listing, { as: 'listingSocial', foreignKey: 'listingId' });
  }
}

/**
 * @type {typeof SocialStatistics}
 */
module.exports = (sequelize, DataTypes) => {
  SocialStatistics.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      listingId: {
        type: DataTypes.UUID,
        field: 'listing_id',
        references: {
          model: 'listings',
          key: 'id',
        },
      },
      saves: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      shares: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'SocialStatistics',
      tableName: 'social_statistics',
    }
  );

  return SocialStatistics;
};
