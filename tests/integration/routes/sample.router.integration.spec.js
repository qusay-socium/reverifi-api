import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../../src/server/express';
import { SampleModel } from '../../../src/dataAccess';

chai.use(chaiHttp);
chai.should();

describe('GET /api/v2/template-service', () => {
  after(async () => {
    await SampleModel.truncate();
  });

  it('should return 400 when body is invalid', async () => {
    const res = await chai.request(app).post('/api/v2/template-service').send({});
    res.should.not.be.undefined;
    res.should.have.status(400);
  });
  it('should return 200 when body is valid', async () => {
    const res = await chai.request(app).post('/api/v2/template-service').send({ name: 'test' });
    res.should.not.be.undefined;
    res.should.have.status(201);
    res.body.should.not.be.undefined;
    res.body.should.have.property('name', 'test');
  });
});
