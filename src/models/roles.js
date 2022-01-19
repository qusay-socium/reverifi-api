const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');

class Roles extends BaseModel {
  static associate({ User }) {
    this.belongsToMany(User, {
      through: 'UserRoles',
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
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Roles',
      tableName: 'roles',
    }
  );
  return Roles;
};
