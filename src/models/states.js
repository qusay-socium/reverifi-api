const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class States extends BaseModel {
  static associate({ Processes }) {
    this.hasOne(Processes, { as: 'state', foreignKey: 'stateId' });
  }
}

/**
 * @type {typeof States}
 */
module.exports = (sequelize, DataTypes) => {
  States.init(
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
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'States',
      tableName: 'states',
    }
  );
  return States;
};
