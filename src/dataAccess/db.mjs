import Sequelize from 'sequelize';

// if db contains long this line should be uncomented
// Sequelize.postgres.DECIMAL.parse = value => parseFloat(value);
export const sequelize = new Sequelize(AppConfigs.connections.rds);
