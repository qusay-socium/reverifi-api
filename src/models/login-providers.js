const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');

class LoginProviders extends BaseModel {
  static associate({ User }) {
    this.belongsTo(User, { as: 'loginProvider', foreignKey: 'userId' });
  }
}

/**
 * @type {typeof LoginProviders}
 */
module.exports = (sequelize, DataTypes) => {
  LoginProviders.init(
    {
      id: {
        description: 'Primary key',
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
      provider: {
        type: DataTypes.ENUM('Facebook', 'Google'),
        defaultValue: 'Email',
      },
    },
    {
      sequelize,
      modelName: 'LoginProviders',
      tableName: 'login-providers',
    }
  );
  return LoginProviders;
};
