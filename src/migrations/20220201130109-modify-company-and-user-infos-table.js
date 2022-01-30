'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('companies', 'address');
    await queryInterface.removeColumn('user_infos', 'website');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('companies', 'address', {
      type: Sequelize.JSON,
    });
    await queryInterface.changeColumn('user_infos', 'website', {
      type: Sequelize.STRING,
    });
  },
};
