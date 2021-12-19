import { UserInfoModel, CompanyModel } from '../models';
// import { PasswordHelper, jwtHelper } from '../../helpers';

export const UserInfoRepo = {
  create: async (loginId, { address, website, languages, serviceAreas, socials, aboutMe, companyId }) => {
    const result = UserInfoModel.create({
      userId: loginId,
      address,
      website,
      languages,
      serviceAreas,
      socials,
      aboutMe,
      companyId,
    });
    return result;
  },
  update: async (loginId, { address, website, languages, serviceAreas, socials, aboutMe, companyId }) => {
    const updateUser = {
      address,
      website,
      languages,
      serviceAreas,
      socials,
      aboutMe,
      companyId,
    };
    const updated = await UserInfoModel.update(updateUser, { where: { user_id: loginId }, returning: true, raw: true, nest: true }).then(res => res[1][0]);
    return updated;
  },
  get: async id => UserInfoModel.findOne({ where: { user_id: id }, include: [{ model: CompanyModel, as: 'company' }] }),
  filter: async ({ limit }) => {
    const filter = {};

    // if (userId) filter.userId = userId;
    const companies = await UserInfoModel.findAndCountAll({
      where: filter,
      limit,
    });
    return companies;
  },
  delete: async id => {
    const dbObj = await UserInfoModel.findByPk(id);
    const deleted = await dbObj.destroy();
    if (!dbObj) throw new Error('item not found');
    return { id: deleted.userId, message: 'Deleted Successfully' };
  },
};
