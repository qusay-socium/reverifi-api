import { UserModel, UserInfoModel, CompanyModel } from './models';

UserModel.hasOne(UserInfoModel, { as: 'userInfo', foreignKey: 'userId' });
UserInfoModel.belongsTo(CompanyModel, { foreignKey: 'company_id' });
