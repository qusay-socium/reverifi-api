const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');

class UserRoles extends BaseModel {
  static associate({ User, Roles }) {
    this.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    });
    this.belongsTo(Roles, {
      foreignKey: 'roleId',
      as: 'role',
    });
  }
}

/**
 * @type {typeof UserRoles}
 */
module.exports = (sequelize, DataTypes) => {
  UserRoles.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'role_id',
        references: {
          model: 'roles',
          key: 'id',
        },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        field: 'is_deleted',
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UserRoles',
      tableName: 'user_roles',
    }
  );
  return UserRoles;
};
