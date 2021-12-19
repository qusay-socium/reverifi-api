import { sequelize } from '../db';
import { ListingSchema } from '../schemas';

export const UserModel = sequelize.define('listings', ListingSchema, { paranoid: true, underscored: true });
