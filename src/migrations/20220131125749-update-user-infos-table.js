'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_infos', 'city', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('user_infos', 'country', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('user_infos', 'zip_code', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('user_infos', 'address', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_infos', 'city');
    await queryInterface.removeColumn('user_infos', 'country');
    await queryInterface.removeColumn('user_infos', 'zip_code');
    await queryInterface.changeColumn('user_infos', 'address', {
      type: Sequelize.JSON,
    });
  },
};
