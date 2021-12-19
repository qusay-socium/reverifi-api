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
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
  deleted_at: {
    type: DataTypes.DATE,
  },
};
