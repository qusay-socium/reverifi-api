const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class Transactions extends BaseModel {
  static associate({
    TransactionWorkflowSteps,
    Listing,
    User,
    TransactionsNotes,
    TransactionAssignee,
    TransactionProcesses,
  }) {
    this.belongsTo(TransactionWorkflowSteps, { as: 'workflowStep', foreignKey: 'workflowStepId' });
    this.belongsTo(Listing, { as: 'transactionListing', foreignKey: 'listingId' });
    this.belongsTo(User, { as: 'createdByUser', foreignKey: 'createdBy' });
    this.hasMany(TransactionsNotes, { as: 'transaction', foreignKey: 'transactionId' });
    this.hasMany(TransactionAssignee, { as: 'assignedTransaction', foreignKey: 'transactionId' });
    this.hasMany(TransactionProcesses, { as: 'currentTransaction', foreignKey: 'transactionId' });
  }
}

/**
 * @type {typeof Transactions}
 */
module.exports = (sequelize, DataTypes) => {
  Transactions.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      listingId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'listing_id',
        references: {
          model: 'listings',
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
      createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'created_by',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'in progress',
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'Transactions',
      tableName: 'transactions',
    }
  );
  return Transactions;
};
