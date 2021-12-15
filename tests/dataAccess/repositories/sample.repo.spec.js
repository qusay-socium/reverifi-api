import chai from 'chai';
import sinon from 'sinon';
import { SampleModel, SampleRepo } from '../../../src/dataAccess';

chai.should();

describe('SampleRepo:create', () => {
  let createStub;

  before(() => {
    createStub = sinon.stub(SampleModel, 'create');
  });
  afterEach(() => {
    createStub.restore();
  });

  it('should create new instance', async () => {
    createStub.callsFake(() => ({
      id: 1,
      name: 'test',
    }));
    const created = await SampleRepo.create('test');
    created.should.have.property('id', 1);
    created.should.have.property('name', 'test');
    created.should.have.property('createdAt');
    created.should.have.property('updatedAt');
  });

  describe('SampleRepo:filter', () => {
    let filterStub;

    before(() => {
      filterStub = sinon.stub(SampleModel, 'findAndCountAll');
    });
    after(() => {
      filterStub.restore();
    });

    it('should return mocked data when called without filter', async () => {
      filterStub.returns({ count: 0, rows: [] });
      const result = await SampleRepo.filter();
      result.should.have.property('count', 0);
      result.should.have.property('rows');
      result.rows.should.be.an('Array');
      result.rows.should.have.length(0);
    });
    it('should return mocked data when called without filter', async () => {
      filterStub.returns({ count: 0, rows: [] });
      const result = await SampleRepo.filter({ name: 's' });
      result.should.have.property('count', 0);
      result.should.have.property('rows');
      result.rows.should.be.an('Array');
      result.rows.should.have.length(0);
    });

    it('should return mocked data when using postgres', async () => {
      const dialect = `${AppConfigs.connections.rds.dialect}`;
      AppConfigs.connections.rds.dialect = 'postgres';
      filterStub.returns({ count: 0, rows: [] });
      const result = await SampleRepo.filter({ name: 's' });
      AppConfigs.connections.rds.dialect = dialect;
      result.should.have.property('count', 0);
      result.should.have.property('rows');
      result.rows.should.be.an('Array');
      result.rows.should.have.length(0);
    });
  });
});
