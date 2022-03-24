const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class Channel extends BaseModel {
  static associate({ NotificationChannels }) {
    this.hasMany(NotificationChannels, { as: 'notificationChannels', foreignKey: 'channelId' });
  }
}

/**
 * @type {typeof Channel}
 */
module.exports = (sequelize, DataTypes) => {
  Channel.init(
    {
      id: {
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      isActive: {
        allowNull: false,
        defaultValue: true,
        field: 'is_active',
        type: DataTypes.BOOLEAN,
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'Channel',
      tableName: 'channels',
    }
  );
  return Channel;
};
