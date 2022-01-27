const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class Roles extends BaseModel {
  static associate({ User, UserRoles }) {
    this.belongsToMany(User, {
      through: UserRoles,
      foreignKey: 'roleId',
      as: 'roles',
    });
  }
}

/**
 * @type {typeof Roles}
 */
module.exports = (sequelize, DataTypes) => {
  Roles.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'Roles',
      tableName: 'roles',
    }
  );
  return Roles;
};
