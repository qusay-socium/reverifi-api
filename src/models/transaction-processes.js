const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class TransactionProcesses extends BaseModel {
  static associate({ Transactions, Processes, TransactionAssignee }) {
    this.belongsTo(Transactions, { as: 'currentTransaction', foreignKey: 'transactionId' });
    this.belongsTo(Processes, { as: 'process', foreignKey: 'processId' });
    this.belongsTo(TransactionAssignee, { as: 'assignee', foreignKey: 'assigneeId' });
  }
}

/**
 * @type {typeof TransactionProcesses}
 */
module.exports = (sequelize, DataTypes) => {
  TransactionProcesses.init(
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
      processId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'process_id',
        references: {
          model: 'processes',
          key: 'id',
        },
      },
      assigneeId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'assignee_id',
        references: {
          model: 'transaction_assignee',
          key: 'id',
        },
      },
      dueDate: {
        field: 'due_date',
        type: DataTypes.DATE,
      },
      isCompleted: {
        field: 'is_completed',
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'TransactionProcesses',
      tableName: 'transaction_processes',
    }
  );
  return TransactionProcesses;
};
