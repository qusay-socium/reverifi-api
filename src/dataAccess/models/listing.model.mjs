import { sequelize } from '../db';
import { ListingSchema } from '../schemas';

export const ListingModel = sequelize.define('listings', ListingSchema, { paranoid: true, underscored: true });
