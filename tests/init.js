import '../src/globals';
import './initRedis';

// override db for testing
AppConfigs.connections.rds.dialect = 'sqlite';
AppConfigs.connections.rds.storage = ':memory:';

module.exports.mochaGlobalSetup = async () => {
  //global setup fixture
  // await import('../src/registerEventHandlers'); ==> if global events needs to be registered
  const { sequelize } = await import('../src/dataAccess');
  await sequelize.sync();
};
