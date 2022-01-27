'use strict';

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

    await queryInterface.createTable('property_type', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: false,
      },
      ...sharedColumns,
    });

    await queryInterface.createTable('listing_type', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: false,
      },
      ...sharedColumns,
    });

    await queryInterface.removeColumn('listings', 'property_type');
    await queryInterface.removeColumn('listings', 'listing_type');
    await queryInterface.removeColumn('listings', 'property_condition');

    await queryInterface.addColumn('listings', 'property_type_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'property_type',
        key: 'id',
      },
      field: 'property_type_id',
    });

    await queryInterface.addColumn('listings', 'listing_type_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'listing_type',
        key: 'id',
      },
      field: 'listing_type_id',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('listings', 'property_type_id');
    await queryInterface.removeColumn('listings', 'listing_type_id');
    await queryInterface.addColumn('listings', 'property_type', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('listings', 'listing_type', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('listings', 'property_condition', {
      type: Sequelize.STRING,
    });
    await queryInterface.dropTable('property_type');
    await queryInterface.dropTable('listing_type');
  },
};
