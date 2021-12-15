import { sequelize } from '../db';
import { UserSchema } from '../schemas';

export const UserModel = sequelize.define('users', UserSchema, { paranoid: true, underscored: true });
