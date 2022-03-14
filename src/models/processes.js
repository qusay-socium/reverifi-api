const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class Processes extends BaseModel {
  static associate({ States, TransactionProcesses }) {
    this.belongsTo(States, { as: 'state', foreignKey: 'stateId' });
    this.hasMany(TransactionProcesses, { as: 'process', foreignKey: 'processId' });
  }
}

/**
 * @type {typeof Processes}
 */
module.exports = (sequelize, DataTypes) => {
  Processes.init(
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
      modelName: 'Processes',
      tableName: 'processes',
    }
  );
  return Processes;
};
