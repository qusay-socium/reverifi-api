const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {
    static associate({ User, Company }) {
      this.belongsTo(User, { as: 'userInfo', foreignKey: 'userId' });
      this.belongsTo(Company, { foreignKey: 'company_id' });
    }
  }
  UserInfo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade ',
        field: 'user_id',
      },
      companyId: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.TEXT,
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
        type: DataTypes.TEXT,
        field: 'about_me',
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
    },
    {
      sequelize,
      tableName: 'user_infos',
      modelName: 'UserInfo',
    }
  );
  return UserInfo;
};
