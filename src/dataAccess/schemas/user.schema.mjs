import Sequelize from 'sequelize';

const { DataTypes } = Sequelize;

export const UserSchema = {
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
  passwordHash: {
    type: DataTypes.STRING(64),
    is: /^[0-9a-f]{64}$/i,
    field: 'password_hash',
  },
  phone: {
    type: DataTypes.TEXT,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    field: 'is_verified',
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
