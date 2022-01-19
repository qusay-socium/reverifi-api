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
      feature: {
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
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      featureId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'feature_id',
        references: {
          model: 'features',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      ...sharedColumns,
    });

    await queryInterface.createTable('roles', {
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

    await queryInterface.createTable('user_roles', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },

      roleId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'role_id',
        references: {
          model: 'roles',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      ...sharedColumns,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_roles');
    await queryInterface.dropTable('roles');
    await queryInterface.dropTable('listing_features');
    await queryInterface.dropTable('features');
  },
};
