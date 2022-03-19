const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class DocumentsNames extends BaseModel {
  static associate({ States, Documents }) {
    this.belongsTo(States, { as: 'documentState', foreignKey: 'stateId' });
    this.hasOne(Documents, { as: 'documentName', foreignKey: 'documentNameId' });
  }
}

/**
 * @type {typeof DocumentsNames}
 */
module.exports = (sequelize, DataTypes) => {
  DocumentsNames.init(
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
      stateId: {
        type: DataTypes.UUID,
        field: 'state_id',
        references: {
          model: 'states',
          key: 'id',
        },
        defaultValue: '1109d922-edef-47da-84eb-27f2ce913c23',
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'DocumentsNames',
      tableName: 'documents_names',
    }
  );
  return DocumentsNames;
};
