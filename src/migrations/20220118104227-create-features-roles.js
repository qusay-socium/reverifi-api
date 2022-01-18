'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sharedColumns = {
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        defaultValue: null,
      },
    };

    await queryInterface.createTable('features', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      ...sharedColumns,
    });

    await queryInterface.createTable('listing_features', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      listingId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'listing_id',
        references: {
          model: 'listings',
          key: 'id',
        },
      },
      featureId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'feature_id',
        references: {
          model: 'features',
          key: 'id',
        },
      },
      ...sharedColumns,
    });

    await queryInterface.createTable('user_roles', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      ...sharedColumns,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_roles');
    await queryInterface.dropTable('listing_features');
    await queryInterface.dropTable('features');
  },
};
