const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');

class ActionTypes extends BaseModel {}

/**
 * @type {typeof ActionTypes}
 */
module.exports = (sequelize, DataTypes) => {
  ActionTypes.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      type: {
        type: DataTypes.STRING,
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: null,
      },
    },
    {
      sequelize,
      tableName: 'action_types',
      modelName: 'ActionTypes',
    }
  );
  return ActionTypes;
};
