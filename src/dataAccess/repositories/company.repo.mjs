import { CompanyModel } from '../models';
// import { PasswordHelper, jwtHelper } from '../../helpers';

export const CompanyRepo = {
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
      name: name ? name : undefined,
      email: email ? email.toLowerCase() : undefined,
      website: website ? website : undefined,
      address: address ? address : undefined,
    };
    const updated = await CompanyModel.update(updateCompany, { where: { id }, returning: true, raw: true, nest: true }).then(res => res[1][0]);
    return { name: updated.name, email: updated.email, website: updated.website, address: updated.address };
  },
  get: async id => CompanyModel.findByPk(id),
  filter: async (userId, { limit }) => {
    const filter = {};

    // if (userId) filter.userId = userId;
    const companies = await CompanyModel.findAndCountAll({
      where: filter,
      limit,
    });
    return companies;
  },
  delete: async id => {
    const dbObj = await CompanyModel.findByPk(id);
    const deleted = await dbObj.destroy();
    if (!dbObj) throw new Error('item not found');
    return { id: deleted.id, message: 'Deleted Successfully' };
  },
};
