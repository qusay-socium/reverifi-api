const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class ScheduleVisit extends BaseModel {
  static associate({ Listing, User }) {
    this.belongsTo(Listing, {
      as: 'visitedListing',
      foreignKey: 'listingId',
    });
    this.belongsTo(User, {
      as: 'visitor',
      foreignKey: 'userId',
    });
  }
}

/**
 * @type {typeof ScheduleVisit}
 */
module.exports = (sequelize, DataTypes) => {
  ScheduleVisit.init(
    {
      id: {
        description: 'Primary key',
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      dateTime: {
        allowNull: false,
        type: DataTypes.JSON,
        unique: false,
        field: 'date_time',
      },
      status: {
        type: DataTypes.STRING,
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
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'user',
          key: 'id',
        },
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'ScheduleVisit',
      tableName: 'schedule_visit',
    }
  );
  return ScheduleVisit;
};
