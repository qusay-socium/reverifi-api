const { Sequelize } = require('sequelize');

const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class Company extends BaseModel {
  static associate({ UserInfo }) {
    this.hasOne(UserInfo, { as: 'userInfo', foreignKey: 'companyId' });
  }
}

/**
 * @type {typeof Company}
 */
module.exports = (sequelize, DataTypes) => {
  Company.init(
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
      website: {
        type: DataTypes.STRING,
      },
      metadata: {
        type: DataTypes.JSON,
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      tableName: 'companies',
      modelName: 'Company',
    }
  );
  return Company;
};
