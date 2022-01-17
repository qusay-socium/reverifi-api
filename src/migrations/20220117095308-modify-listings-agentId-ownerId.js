'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('listings', 'listings_agent_id_fkey1');
    await queryInterface.removeConstraint('listings', 'listings_owner_id_fkey1');

    await queryInterface.changeColumn('listings', 'agentId', {
      type: Sequelize.UUID,
      allowNull: true,
      field: 'agent_id',
    });

    await queryInterface.changeColumn('listings', 'ownerId', {
      type: Sequelize.UUID,
      allowNull: true,
      field: 'owner_id',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('listings', 'agent_id', {
      type: Sequelize.UUID,
      allowNull: false,
    });

    await queryInterface.changeColumn('listings', 'owner_id', {
      type: Sequelize.UUID,
      allowNull: false,
    });
  },
};
