const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class Schedule extends BaseModel {
  static associate({ Listing }) {
    this.belongsTo(Listing, {
      as: 'schedule',
      foreignKey: 'listingId',
    });
  }
}

/**
 * @type {typeof Schedule}
 */
module.exports = (sequelize, DataTypes) => {
  Schedule.init(
    {
      id: {
        description: 'Primary key',
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      days: {
        allowNull: false,
        type: DataTypes.JSON,
        unique: false,
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATE,
        unique: false,
        field: 'start_date',
      },
      endDate: {
        allowNull: false,
        type: DataTypes.DATE,
        unique: false,
        field: 'end_date',
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
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'Schedule',
      tableName: 'schedule',
    }
  );
  return Schedule;
};
