'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'provider', {
      type: Sequelize.ENUM('Email', 'Facebook', 'Google'),
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'provider');
  }
};
