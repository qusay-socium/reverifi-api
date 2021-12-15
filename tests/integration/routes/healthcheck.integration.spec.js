import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../../src/server/express';
import appInfo from '../../../package.json';

chai.use(chaiHttp);
chai.should();

describe('GET /api/v2/template-service/healthcheck', () => {
  it('should return 200 & app info', async () => {
    const res = await chai.request(app).get('/api/v2/template-service/healthcheck');
    res.should.not.be.undefined;
    res.should.have.status(200);
    res.body.should.not.be.undefined;
    res.body.should.have.property('name', appInfo.name);
    res.body.should.have.property('version', appInfo.version);
  });
});
