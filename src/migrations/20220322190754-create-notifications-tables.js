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

    await queryInterface.createTable('notification_types', {
      id: {
        description: 'Primary key',
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ...sharedColumns,
    });

    await queryInterface.createTable('channels', {
      id: {
        description: 'Primary key',
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        field: 'is_active',
        defaultValue: true,
        allowNull: false,
      },
      ...sharedColumns,
    });

    await queryInterface.createTable('notification_channels', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      notificationTypeId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'notification_type_id',
        references: {
          model: 'notification_types',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      channelId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'channel_id',
        references: {
          model: 'channels',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      content: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      view: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      title: {
        allowNull: true,
        type: Sequelize.STRING,
      },
    });

    await queryInterface.createTable('notifications', {
      id: {
        description: 'Primary key',
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      notificationChannelId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'notification_channel_id',
        references: {
          model: 'notification_channels',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      sentTo: {
        allowNull: false,
        type: Sequelize.UUID,
        field: 'sent_to',
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      content: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      retries: {
        type: Sequelize.INTEGER,
      },
      responseMessage: {
        type: Sequelize.STRING,
        field: 'response_message',
      },
      ...sharedColumns,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('notifications');
    await queryInterface.dropTable('notification_channels');
    await queryInterface.dropTable('channels');
    await queryInterface.dropTable('notification_types');
  },
};
