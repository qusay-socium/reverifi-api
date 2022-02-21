'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('companies', 'companies_email_key');
  },

  down: async (queryInterface, Sequelize) => {},
};
