const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class NotificationType extends BaseModel {
  static associate({ NotificationChannels }) {
    this.hasMany(NotificationChannels, {
      as: 'notificationChannels',
      foreignKey: 'notificationTypeId',
    });
  }
}

/**
 * @type {typeof NotificationType}
 */
module.exports = (sequelize, DataTypes) => {
  NotificationType.init(
    {
      id: {
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        type: DataTypes.UUID,
      },
      description: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'NotificationType',
      tableName: 'notification_types',
    }
  );
  return NotificationType;
};
