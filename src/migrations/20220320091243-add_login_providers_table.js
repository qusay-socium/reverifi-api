'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('login-providers', {
      id: {
        description: 'Primary key',
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      provider: {
        type: Sequelize.ENUM('Facebook', 'Google'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('login-providers');
  },
};
