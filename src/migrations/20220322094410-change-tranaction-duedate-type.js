module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('transaction_processes', 'due_date');
    await queryInterface.addColumn('transaction_processes', 'due_date', {
      type: Sequelize.DATE,
      field: 'due_date',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('transaction_processes', 'due_date');
    await queryInterface.addColumn('transaction_processes', 'due_date', {
      type: Sequelize.ARRAY(Sequelize.DATE),
      field: 'due_date',
    });
  },
};
