const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class Notification extends BaseModel {
  static associate({ NotificationChannels, User }) {
    this.belongsTo(User, {
      as: 'user',
      foreignKey: 'sentTo',
    });
    this.belongsTo(NotificationChannels, {
      as: 'notificationChannel',
      foreignKey: 'notificationChannelId',
    });
  }

  /**
   * Get all notifications with user and notification channel.
   *
   * @param {import("sequelize").WhereOptions} condition The query where condition.
   *
   * @return {Promise<Object[]>} Array of notifications.
   */
  static async getAllWithUserAndChannel(condition) {
    const notifications = await Notification.getAllByCondition(condition, {
      include: [
        {
          association: 'user',
          attributes: ['email', 'phone'],
        },
        {
          association: 'notificationChannel',
          attributes: ['channelId', 'view', 'title'],
          include: [{ association: 'channel', attributes: ['id', 'name'] }],
        },
      ],
    });

    return notifications;
  }
}

/**
 * @type {typeof Notification}
 */
module.exports = (sequelize, DataTypes) => {
  Notification.init(
    {
      id: {
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        type: DataTypes.UUID,
      },
      notificationChannelId: {
        allowNull: false,
        field: 'notification_channel_id',
        references: { key: 'id', model: 'notification_channels' },
        type: DataTypes.UUID,
      },
      sentTo: {
        allowNull: false,
        field: 'sent_to',
        references: { key: 'id', model: 'users' },
        type: DataTypes.UUID,
      },
      content: {
        allowNull: false,
        type: DataTypes.JSON,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      retries: {
        type: DataTypes.INTEGER,
      },
      responseMessage: {
        field: 'response_message',
        type: DataTypes.STRING,
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'Notification',
      tableName: 'notifications',
    }
  );
  return Notification;
};
