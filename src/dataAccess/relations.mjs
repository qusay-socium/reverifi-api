import { UserModel, UserInfoModel } from './models';

UserModel.hasOne(UserInfoModel, { as: 'userInfo', foreignKey: 'userId' });
