import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { app } from '../../src/server/express';
import { SampleRepo } from '../../src/dataAccess';

chai.use(chaiHttp);
chai.should();

describe('Express tests', () => {
  describe('error middleware', () => {
    it('should call error middleware when exception occurs', async () => {
      const stub = sinon.stub(SampleRepo, 'create');
      stub.throwsException('error');
      const res = await chai.request(app).post('/api/v2/template-service').send({ name: 'test' });
      stub.restore();
      res.should.have.status(500);
    });
  });
});
