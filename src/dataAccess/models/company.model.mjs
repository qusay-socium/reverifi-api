import { sequelize } from '../db';
import { CompanySchema } from '../schemas';

export const CompanyModel = sequelize.define('companies', CompanySchema, { paranoid: true, underscored: true });
