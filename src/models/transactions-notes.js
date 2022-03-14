const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class TransactionsNotes extends BaseModel {
  static associate({ TransactionWorkflowSteps, Transactions }) {
    this.belongsTo(TransactionWorkflowSteps, { as: 'stepNote', foreignKey: 'workflowStepId' });
    this.belongsTo(Transactions, { as: 'transaction', foreignKey: 'transactionId' });
  }
}

/**
 * @type {typeof TransactionsNotes}
 */
module.exports = (sequelize, DataTypes) => {
  TransactionsNotes.init(
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
      workflowStepId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'workflow_step_id',
        references: {
          model: 'transaction_workflow_steps',
          key: 'id',
        },
      },
      notes: {
        type: DataTypes.STRING(500),
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'TransactionsNotes',
      tableName: 'transactions_notes',
    }
  );
  return TransactionsNotes;
};
