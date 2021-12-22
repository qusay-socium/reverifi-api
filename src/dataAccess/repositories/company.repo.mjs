import { getUpdatedEntity } from '../../helpers';
import { CompanyModel } from '../models';

const CompanyRepo = {
  create: async (loginId, { name, email, website, address }) => {
    const result = CompanyModel.create({
      name,
      email,
      website,
      address,
    });
    return result;
  },
  update: async (id, { name, email, website, address }) => {
    const updateCompany = {
      name,
      email: email ? email.toLowerCase() : undefined,
      website,
      address,
    };
    const updated = await CompanyModel.update(updateCompany, { where: { id }, returning: true, raw: true }).then(res => getUpdatedEntity(res));

    return updated;
  },
  get: async id => CompanyModel.findByPk(id),
  filter: async (userId, { limit }) => {
    const filter = {};

    const companies = await CompanyModel.findAndCountAll({
      where: filter,
      limit,
    });
    return companies;
  },
  delete: async id => {
    const dbObj = await CompanyModel.findByPk(id);
    if (!dbObj) return undefined;
    const deleted = await dbObj.destroy();
    return { id: deleted.id, message: 'Deleted Successfully' };
  },
};
