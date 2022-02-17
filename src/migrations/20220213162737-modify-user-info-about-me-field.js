'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('user_infos', 'aboutMe', {
      type: Sequelize.STRING(500),
      field: 'about_me',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('user_infos', 'aboutMe', {
      type: Sequelize.STRING,
      field: 'about_me',
    });
  },
};
