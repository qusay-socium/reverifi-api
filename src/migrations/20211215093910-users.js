import { UserSchema, UserInfoSchema } from '../dataAccess/schemas';
export async function up(queryInterface) {
  return Promise.all([
    queryInterface.createTable('users', { ...UserSchema }),
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
  ]);
}

export async function down(queryInterface) {
  return Promise.all([queryInterface.dropTable('user_infos'), queryInterface.dropTable('users')]);
}
