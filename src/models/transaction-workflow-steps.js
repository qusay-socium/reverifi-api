const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class TransactionWorkflowSteps extends BaseModel {
  static associate({ Transactions, TransactionsNotes }) {
    this.hasMany(Transactions, { as: 'workflowStep', foreignKey: 'workflowStepId' });
    this.hasMany(TransactionsNotes, { as: 'stepNote', foreignKey: 'workflowStepId' });
  }
}

/**
 * @type {typeof TransactionWorkflowSteps}
 */
module.exports = (sequelize, DataTypes) => {
  TransactionWorkflowSteps.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stepNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'step_number',
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'TransactionWorkflowSteps',
      tableName: 'transaction_workflow_steps',
    }
  );
  return TransactionWorkflowSteps;
};
