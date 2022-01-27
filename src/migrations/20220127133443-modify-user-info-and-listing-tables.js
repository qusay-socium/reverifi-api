module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('listings', 'status');

    await queryInterface.addColumn('listings', 'tags', {
      type: Sequelize.ARRAY(Sequelize.STRING),
    });

    await queryInterface.addColumn('user_infos', 'image', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('listings', 'status', {
      type: Sequelize.STRING,
    });
    await queryInterface.removeColumn('listings', 'tags');
    await queryInterface.removeColumn('user_infos', 'image');
  },
};
