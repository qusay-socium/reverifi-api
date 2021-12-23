const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class UserInfo extends BaseModel {
  static associate({ User, Company }) {
    this.belongsTo(User, { as: 'user', foreignKey: 'userId' });
    this.belongsTo(Company, { as: 'company', foreignKey: 'companyId' });
  }
}

/**
 * @type {typeof UserInfo}
 */
module.exports = (sequelize, DataTypes) => {
  UserInfo.init(
    {
      id: {
        description: 'Primary key',
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade ',
        field: 'user_id',
      },
      companyId: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null,
        onUpdate: 'cascade',
        onDelete: 'cascade',
        field: 'company_id',
      },
      address: {
        type: DataTypes.JSON,
      },
      website: {
        type: DataTypes.STRING,
      },
      languages: {
        type: DataTypes.ARRAY(DataTypes.STRING(55)),
      },
      serviceAreas: {
        type: DataTypes.ARRAY(DataTypes.STRING(55)),
        field: 'service_areas',
      },
      socials: {
        type: DataTypes.JSON,
      },
      aboutMe: {
        type: DataTypes.STRING,
        field: 'about_me',
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      tableName: 'user_infos',
      modelName: 'UserInfo',
    }
  );
  return UserInfo;
};
