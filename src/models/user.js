const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class User extends BaseModel {
  static associate({ UserInfo, Listing, Roles, UserRoles }) {
    this.hasOne(UserInfo, { as: 'userInfo', foreignKey: 'userId' });
    this.hasOne(Listing, { as: 'agent', foreignKey: 'agentId' });
    this.hasOne(Listing, { as: 'ownedListing', foreignKey: 'ownerId' });
    this.belongsToMany(Roles, {
      through: UserRoles,
      foreignKey: 'userId',
      as: 'roles',
    });
  }

  /**
   * Get user with roles.
   *
   * @param {string} email User email.
   *
   * @return {Promise<Object>} The user data.
   */
  static async getUserWithRoles(email) {
    const result = await this.getOneByCondition({ email }, { include: ['roles'] });

    return result;
  }
}

/**
 * @type {typeof User}
 */
module.exports = (sequelize, DataTypes) => {
  User.init(
    {
      id: {
        description: 'Primary key',
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        field: 'is_verified',
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  );
  return User;
};
