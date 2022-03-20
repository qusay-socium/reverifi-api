module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'documents_names',
      [
        {
          id: '38bc2b62-62c8-4dd0-906c-fb2c8445b4ce',
          name: 'Certificate of Occupancy',
        },
        {
          id: 'c5569037-f275-4332-9159-1f5fe90dbf4c',
          name: 'Consumer Information Statement',
        },
        {
          id: '642ec271-26e3-44f3-b0fa-6a4be4cc9bf2',
          name: 'Lead Based Paint Form',
        },
        {
          id: 'c10be1d5-56f5-4101-88c7-2ab42d4b83b1',
          name: 'NJ MLS Residential Listing Agreement',
        },
      ].map((item) => ({ ...item, created_at: Sequelize.fn('now') }))
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('documents_names', {
      id: [
        '38bc2b62-62c8-4dd0-906c-fb2c8445b4ce',
        'c5569037-f275-4332-9159-1f5fe90dbf4c',
        '642ec271-26e3-44f3-b0fa-6a4be4cc9bf2',
        'c10be1d5-56f5-4101-88c7-2ab42d4b83b1',
      ],
    });
  },
};
