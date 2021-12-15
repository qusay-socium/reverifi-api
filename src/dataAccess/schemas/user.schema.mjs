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
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.STRING(64),
    is: /^[0-9a-f]{64}$/i,
    field: 'password_hash',
  },
  phone: {
    type: DataTypes.STRING,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    field: 'is_verified',
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
  },
  updated_at: {
    type: DataTypes.DATE,
    field: 'updated_at',
  },
  deletedAt: {
    type: DataTypes.DATE,
    field: 'deleted_at',
  },
};
