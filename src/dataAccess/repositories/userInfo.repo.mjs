import { UserInfoModel, CompanyModel } from '../models';
import { getUpdatedEntity } from '../../helpers';

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
    const updated = await UserInfoModel.update(updateUser, { where: { user_id: loginId }, returning: true, raw: true, nest: true }).then(res => getUpdatedEntity(res));
    return updated;
  },
  get: async id =>
    UserInfoModel.findByPk(id, {
      include: [
        {
          model: CompanyModel,
          required: true,
        },
      ],
    }),
  filter: async ({ limit }) => {
    const filter = {};

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
