import chai from 'chai';
import { SampleModel, SampleRepo } from '../../../../src/dataAccess';

chai.should();

describe('SampleRepo:create [integration]', () => {
  after(async () => {
    await SampleModel.truncate();
  });

  it('should create new instance', async () => {
    const created = await SampleRepo.create('test');
    created.should.have.property('id');
    created.should.have.property('name', 'test');
    created.should.have.property('createdAt');
    created.should.have.property('updatedAt');
  });
});

describe('SampleRepo:filter [integration]', () => {
  describe('when empty data', () => {
    it('should return empty array without filter', async () => {
      const list = await SampleRepo.filter();
      list.should.have.property('count', 0);
      list.should.have.property('rows');
      list.rows.should.be.an('Array');
      list.rows.should.have.length(0);
    });
    it('should return empty array with filter', async () => {
      const list = await SampleRepo.filter({ name: 'test' });
      list.should.have.property('count', 0);
      list.should.have.property('rows');
      list.rows.should.be.an('Array');
      list.rows.should.have.length(0);
    });
  });
});
