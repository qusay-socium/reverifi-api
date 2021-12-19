import { UserSchema, UserInfoSchema, CompanySchema, ListingSchema } from '../dataAccess/schemas';
export async function up(queryInterface) {
  return Promise.all([
    queryInterface.createTable('users', { ...UserSchema }),
    queryInterface.createTable('companies', { ...CompanySchema }),
    queryInterface.createTable(
      'user_infos',
      { ...UserInfoSchema },
      {
        uniqueKeys: {
          actions_unique: {
            fields: ['user_id'],
          },
        },
      }
    ),
    queryInterface.createTable('listings', { ...ListingSchema }),
  ]);
}

export async function down(queryInterface) {
  return Promise.all([queryInterface.dropTable('listings'), queryInterface.dropTable('user_infos'), queryInterface.dropTable('companies'), queryInterface.dropTable('users')]);
}
