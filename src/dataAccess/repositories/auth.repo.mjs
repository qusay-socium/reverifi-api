import { UserModel, UserInfoModel, CompanyModel } from '../models';
import { PasswordHelper, jwtHelper } from '../../helpers';

export const AuthRepo = {
  login: async claim => {
    const user = await UserModel.findOne({
      where: { email: claim.email.toLowerCase() },
      include: [
        {
          model: UserInfoModel,
          as: 'userInfo',
        },
      ],
    });
    if (user == null) return undefined;
    const verified = await PasswordHelper.verify(claim.password, user.passwordHash);
    if (!verified) return undefined;

    const signedUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      info: user.userInfo
        ? {
            aboutMe: user.userInfo.aboutMe,
            languages: user.userInfo.languages,
            serviceAreas: user.userInfo.serviceAreas,
            contact: user.userInfo.contact,
            address: user.userInfo.address,
            website: user.userInfo.website,
            socials: user.userInfo.socials,
            companyId: user.userInfo.companyId,
          }
        : undefined,
      // company: user.company
      //   ? {
      //       name: user.company.name,
      //       email: user.company.email,
      //       website: user.company.website,
      //       address: user.company.address,
      //     }
      //   : undefined,
    };

    const [token, refreshToken] = await jwtHelper.sign(signedUser);
    return {
      userId: user.id,
      token,
      refreshToken,
    };
  },
  signUp: async claim => {
    const hash = claim.password ? await PasswordHelper.hash(claim.password) : {};
    try {
      const created = await UserModel.create({
        name: claim.name,
        email: claim.email.toLowerCase(),
        passwordHash: hash,
        phone: claim.phone,
      });
      return { name: created.name, email: created.email, isVerfied: created.isVerfied };
    } catch (err) {
      if (err.message === 'Validation error') {
        return undefined;
      }
      throw err;
    }
  },
};
