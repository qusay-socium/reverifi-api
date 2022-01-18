'use strict';
const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');

class UserRoles extends BaseModel {
  static associate() {}
}

module.exports = (sequelize, DataTypes) => {
  UserRoles.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'userRoles',
      tableName: 'user_roles',
    }
  );
  return UserRoles;
};
