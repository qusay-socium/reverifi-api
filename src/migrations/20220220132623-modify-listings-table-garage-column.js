module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('listings', 'garage', 'garages');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('listings', 'garages', 'garage');
  },
};
