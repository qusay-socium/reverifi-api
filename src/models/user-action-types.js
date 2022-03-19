const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');

class UserActionTypes extends BaseModel {}

/**
 * @type {typeof UserActionTypes}
 */
module.exports = (sequelize, DataTypes) => {
  UserActionTypes.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      actionTypeId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'action_type_id',
        references: {
          model: 'action_types',
          key: 'id',
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'user_action_types',
      modelName: 'UserActionTypes',
    }
  );
  return UserActionTypes;
};
