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

    await queryInterface.createTable('invitation_type', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      listingId: {
        type: Sequelize.UUID,
        field: 'listing_id',
        references: {
          model: 'listings',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      model: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      ...sharedColumns,
    });

    await queryInterface.createTable('invitations', {
      id: {
        description: 'Primary key',
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      inviteById: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'invite_by_id',
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      invitedUserId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'invited_user_id',
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      invitationTypeId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'invitation_type_id',
        references: {
          model: 'invitation_type',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      role: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      ...sharedColumns,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('invitations');
    await queryInterface.dropTable('invitation_type');
  },
};
