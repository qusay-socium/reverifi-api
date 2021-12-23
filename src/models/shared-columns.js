const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => ({
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.literal('NOW()'),
  },
  createdBy: {
    type: DataTypes.UUID,
    field: 'created_by',
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.literal('NOW() ON UPDATE NOW()'),
  },
  updatedBy: {
    type: DataTypes.UUID,
    field: 'updated_by',
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    field: 'is_deleted',
    defaultValue: false,
    allowNull: false,
  },
});
