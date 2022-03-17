const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class TransactionAssignee extends BaseModel {
  static associate({ Transactions, User, TransactionProcesses }) {
    this.belongsTo(Transactions, { as: 'assignedTransaction', foreignKey: 'transactionId' });
    this.belongsTo(User, { as: 'assignedUser', foreignKey: 'userId' });
    this.hasMany(TransactionProcesses, { as: 'assignee', foreignKey: 'assigneeId' });
  }
}

/**
 * @type {typeof TransactionAssignee}
 */
module.exports = (sequelize, DataTypes) => {
  TransactionAssignee.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      transactionId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'transaction_id',
        references: {
          model: 'transactions',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'TransactionAssignee',
      tableName: 'transaction_assignee',
    }
  );
  return TransactionAssignee;
};
