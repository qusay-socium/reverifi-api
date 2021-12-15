import { sequelize } from '../db';
import { UserInfoSchema } from '../schemas';

export const UserInfoModel = sequelize.define('user_infos', UserInfoSchema, { timestamps: false, underscored: true });
