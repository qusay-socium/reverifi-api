import Sequelize from 'sequelize';

const { DataTypes } = Sequelize;

export const CompanySchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
  },
  email: {
    type: DataTypes.TEXT,
    unique: true,
  },
  website: {
    type: DataTypes.TEXT,
  },
  address: {
    type: DataTypes.JSON,
  },
  metadata: {
    type: DataTypes.JSON,
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
};
