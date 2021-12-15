import { sequelize } from '../db';
import { SampleSchema } from '../schemas';

export const SampleModel = sequelize.define('sample_table', SampleSchema, { timestamps: true, underscored: true });
