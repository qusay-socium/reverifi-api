module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sharedColumns = {
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      createdBy: {
        type: Sequelize.UUID,
        field: 'created_by',
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        defaultValue: null,
      },
      updatedBy: {
        type: Sequelize.UUID,
        field: 'updated_by',
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        field: 'is_deleted',
        defaultValue: false,
        allowNull: false,
      },
    };

    await queryInterface.createTable('schedule', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      days: {
        allowNull: false,
        type: Sequelize.JSON,
        unique: false,
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
        unique: false,
        field: 'start_date',
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE,
        unique: false,
        field: 'end_date',
      },
      listingId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'listing_id',
        references: {
          model: 'listings',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      ...sharedColumns,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('schedule');
  },
};
