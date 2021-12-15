import Sequelize from 'sequelize';

const { DataTypes } = Sequelize;

export const UserInfoSchema = {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'cascade',
  },
  about_me: {
    type: DataTypes.TEXT,
  },
  languages: {
    type: DataTypes.JSON,
  },
  service_areas: {
    type: DataTypes.JSON,
  },
  contact: {
    type: DataTypes.JSON,
  },
};
