'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('listings', 'lot_dimensions');
    await queryInterface.addColumn('listings', 'lot_dimensions', {
      type: Sequelize.JSON,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('listings', 'lot_dimensions');
    await queryInterface.addColumn('listings', 'lot_dimensions', {
      type: Sequelize.DOUBLE,
    });
  },
};
