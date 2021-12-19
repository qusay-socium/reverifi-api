import { UserModel, UserInfoModel, CompanyModel } from './models';

UserModel.hasOne(UserInfoModel, { as: 'userInfo', foreignKey: 'userId' });
UserInfoModel.hasOne(CompanyModel, { as: 'company', foreignKey: 'id' });
