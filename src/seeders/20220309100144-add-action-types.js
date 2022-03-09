'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('action_types', [
      {
        id: '51f7540c-b083-4720-b796-b0285f8b257a',
        type: 'Registration',
        points: 30,
        created_at: Sequelize.fn('now'),
      },
      {
        id: '51f7540c-b083-4720-b796-b0285f8b257b',
        type: 'Login',
        points: 20,
        created_at: Sequelize.fn('now'),
      },
      {
        id: '51f7540c-b083-4720-b796-b0285f8b257c',
        type: 'Complete profile',
        points: 40,
        created_at: Sequelize.fn('now'),
      },
      {
        id: '51f7540c-b083-4720-b796-b0285f8b257d',
        type: 'New listing',
        points: 80,
        created_at: Sequelize.fn('now'),
      },
      {
        id: '51f7540c-b083-4720-b796-b0285f8b257e',
        type: 'Close deal',
        points: 200,
        created_at: Sequelize.fn('now'),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('action-types', {
      id: [
        '51f7540c-b083-4720-b796-b0285f8b257a',
        '51f7540c-b083-4720-b796-b0285f8b257b',
        '51f7540c-b083-4720-b796-b0285f8b257c',
        '51f7540c-b083-4720-b796-b0285f8b257d',
        '51f7540c-b083-4720-b796-b0285f8b257e',
      ],
    });
  },
};
