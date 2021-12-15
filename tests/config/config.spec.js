import chai from 'chai';
import { readFile } from 'fs';
import { promisify } from 'util';
import * as dotenv from 'dotenv';
import asyncChai from 'chai-as-promised';

const readFileAsync = promisify(readFile);
chai.use(asyncChai);
chai.should();

describe('load env config', () => {
  it('should load custom env file', async () => {
    const expected = dotenv.parse((await readFileAsync('tests/.env.test')).toString());
    expected.NODE_ENV.should.equal('test');
    AppConfigs.should.not.be.undefined;
    AppConfigs.port.should.not.be.undefined;
    AppConfigs.port.should.equal(+expected.SERVER_PORT);
    AppConfigs.cors.should.not.be.undefined;
    AppConfigs.cors.origin.should.not.be.undefined;
    AppConfigs.cors.origin.should.equal(expected.CORS_ORIGIN);
    AppConfigs.connections.should.not.be.undefined;
    AppConfigs.connections.rds.should.not.be.undefined;
    AppConfigs.connections.rds.database.should.not.be.undefined;
    AppConfigs.connections.rds.database.should.equal(expected.DB_DATABASE);
    AppConfigs.connections.rds.username.should.not.be.undefined;
    AppConfigs.connections.rds.username.should.equal(expected.DB_USERNAME);
    AppConfigs.connections.rds.password.should.not.be.undefined;
    AppConfigs.connections.rds.password.should.equal(expected.DB_PASSWORD);
    AppConfigs.connections.rds.host.should.not.be.undefined;
    AppConfigs.connections.rds.host.should.equal(expected.DB_HOST);
    AppConfigs.connections.rds.port.should.not.be.undefined;
    AppConfigs.connections.rds.port.should.equal(+expected.DB_PORT);
    AppConfigs.connections.rds.pool.should.not.be.undefined;
    AppConfigs.connections.rds.pool.max.should.not.be.undefined;
    AppConfigs.connections.rds.pool.max.should.equal(20);
  })
})