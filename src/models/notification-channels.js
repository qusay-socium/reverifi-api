const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');

class NotificationChannels extends BaseModel {
  static associate({ NotificationType, Channel, Notification }) {
    this.belongsTo(Channel, { as: 'channel', foreignKey: 'channelId' });
    this.belongsTo(NotificationType, { as: 'notificationType', foreignKey: 'notificationTypeId' });
    this.hasMany(Notification, { as: 'notifications', foreignKey: 'notificationChannelId' });
  }
}

/**
 * @type {typeof NotificationChannels}
 */
module.exports = (sequelize, DataTypes) => {
  NotificationChannels.init(
    {
      id: {
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        type: DataTypes.UUID,
      },
      notificationTypeId: {
        allowNull: false,
        field: 'notification_type_id',
        references: { key: 'id', model: 'notification_types' },
        type: DataTypes.UUID,
      },
      channelId: {
        allowNull: false,
        field: 'channel_id',
        references: { key: 'id', model: 'channels' },
        type: DataTypes.UUID,
      },
      content: {
        allowNull: false,
        type: DataTypes.JSON,
      },
      view: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      title: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'NotificationChannels',
      tableName: 'notification_channels',
    }
  );
  return NotificationChannels;
};
