module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('transactions', 'final_sale_price', {
      type: Sequelize.STRING,
      field: 'final_sale_price',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('transactions', 'final_sale_price');
  },
};
