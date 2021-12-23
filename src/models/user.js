const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class User extends BaseModel {
  static associate({ UserInfo, Listing }) {
    this.hasOne(UserInfo, { as: 'userInfo', foreignKey: 'userId' });
    this.hasMany(Listing, { as: 'agents', foreignKey: 'ownerId' });
    this.hasMany(Listing, { as: 'ownedListings', foreignKey: 'ownerId' });
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
