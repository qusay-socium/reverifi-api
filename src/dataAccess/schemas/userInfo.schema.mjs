import Sequelize from 'sequelize';

const { DataTypes } = Sequelize;

export const UserInfoSchema = {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'cascade',
    field: 'user_id',
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: {
      model: 'companies',
      key: 'id',
    },
    onUpdate: 'cascade',
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
};
