import Sequelize from 'sequelize';
import { SampleModel } from './../models';

export const SampleRepo = {
  create: async (name, performedBy, requestId) => {
    const toAdd = new SampleModel();
    toAdd.name = name;
    // toAdd.user = performedBy;
    Logger.info('repo:SampleRepo:add', 'add a sample', requestId, { ...toAdd });
    return toAdd.save(); // or just call SampleModel.create({name})
  },
  // get: async (id, requestId) => {
  //   if (!id) throw new Error('id is required');
  //   Logger.info('repo:SampleRepo:get', 'get a sample', requestId, { id });
  //   return SampleModel.findByPk(id);
  // },
  // update: async (id, name, performedBy, requestId) => {
  //   if (!id) throw new Error('id is required');
  //   const dbObj = await SampleModel.findByPk(id);
  //   if (!obj) throw new Error('object is required');
  //   if (!dbObj) throw new Error('item not found');
  //   if (name) dbObj.name = obj.name;
  //   // dbObj.user = performedBy;
  //   Logger.info('repo:SampleRepo:update', 'update a sample', requestId, { ...dbObj });
  //   return dbObj.update(obj);
  // },
  // delete: async (id, performedBy, requestId) => {
  //   if (!id) throw new Error('id is required');
  //   const dbObj = await SampleModel.findByPk(id);
  //   if (!dbObj) throw new Error('item not found');
  //   // dbObj.user = performedBy;
  //   Logger.info('repo:SampleRepo:delete', 'delete a sample', requestId, { ...dbObj });
  //   return dbObj.destroy();
  // },
  filter: async ({ name } = {}, requestId, offset = undefined, limit = undefined) => {
    const filter = {};
    if (name)
      filter.name =
        AppConfigs.connections.rds.dialect === 'postgres'
          ? (filter.name = { [Sequelize.Op.iLike]: `%${name}%` })
          : Sequelize.where(Sequelize.fn('lower', Sequelize.col(SampleModel.tableAttributes.name.field)), { [Sequelize.Op.like]: `%${name.toLowerCase()}%` });
    Logger.info('repo:SampleRepo:filter', 'filter samples', requestId, { ...filter });
    return SampleModel.findAndCountAll({ where: filter }, offset, limit);
  },
};
