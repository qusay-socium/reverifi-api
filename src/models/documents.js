const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class Documents extends BaseModel {
  static associate({ Transactions, DocumentsNames, User }) {
    this.belongsTo(Transactions, { as: 'transactionDocument', foreignKey: 'transactionId' });
    this.belongsTo(DocumentsNames, { as: 'documentName', foreignKey: 'documentNameId' });
    this.belongsTo(User, { as: 'documentUser', foreignKey: 'createdBy' });
  }
}

/**
 * @type {typeof Documents}
 */
module.exports = (sequelize, DataTypes) => {
  Documents.init(
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
      documentNameId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'document_name_id',
        references: {
          model: 'documents_names',
          key: 'id',
        },
      },
      documentUrl: {
        type: DataTypes.STRING,
        field: 'document_url',
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'Documents',
      tableName: 'documents',
    }
  );
  return Documents;
};
