const config = require('./config');

const { dbHost, dbName, dbPassword, dbPort, dbUsername } = config;

const defaultConfig = {
  database: dbName,
  dialect: 'postgres',
  host: dbHost,
  password: dbPassword,
  port: dbPort,
  username: dbUsername,
  seederStorage: 'sequelize',
};

/**
 * The config object for sequelize-cli.
 */
module.exports = {
  development: defaultConfig,
  test: defaultConfig,
  production: defaultConfig,
};
