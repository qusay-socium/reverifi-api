module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('property_type', {
      id: ['6af792b3-5f59-4789-bd5a-3714e5b7aa14'],
    });
    await queryInterface.bulkInsert('property_type', [
      {
        id: '6af792b3-5f59-4789-bd5a-3714e5b7aa14',
        type: 'Apartment',
        created_at: Sequelize.fn('now'),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('property_type', {
      id: ['6af792b3-5f59-4789-bd5a-3714e5b7aa14'],
    });
    await queryInterface.bulkInsert('property_type', [
      {
        id: '6af792b3-5f59-4789-bd5a-3714e5b7aa14',
        type: 'Apartments',
        created_at: Sequelize.fn('now'),
      },
    ]);
  },
};
