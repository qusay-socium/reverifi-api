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

    await queryInterface.createTable('transaction_workflow_steps', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stepNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'step_number',
      },
      ...sharedColumns,
    });

    await queryInterface.createTable('transactions', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
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
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      workflowStepId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'workflow_step_id',
        references: {
          model: 'transaction_workflow_steps',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      createdBy: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'created_by',
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'in progress',
      },
      ...sharedColumns,
    });

    await queryInterface.createTable('transactions_notes', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      transactionId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'transaction_id',
        references: {
          model: 'transactions',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      workflowStepId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'workflow_step_id',
        references: {
          model: 'transaction_workflow_steps',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      notes: {
        type: Sequelize.STRING(500),
      },
      ...sharedColumns,
    });

    await queryInterface.createTable('transaction_assignee', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      transactionId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'transaction_id',
        references: {
          model: 'transactions',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ...sharedColumns,
    });

    await queryInterface.createTable('states', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ...sharedColumns,
    });

    await queryInterface.createTable('processes', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stateId: {
        type: Sequelize.UUID,
        field: 'state_id',
        references: {
          model: 'states',
          key: 'id',
        },
        defaultValue: '1109d922-edef-47da-84eb-27f2ce913c23',
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      ...sharedColumns,
    });

    await queryInterface.createTable('transaction_processes', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      transactionId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'transaction_id',
        references: {
          model: 'transactions',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      processId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'process_id',
        references: {
          model: 'processes',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      assigneeId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'assignee_id',
        references: {
          model: 'transaction_assignee',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      dueDate: {
        field: 'due_date',
        type: Sequelize.ARRAY(Sequelize.DATE),
      },
      isCompleted: {
        field: 'is_completed',
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      ...sharedColumns,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('transaction_workflow_steps');
    await queryInterface.dropTable('transactions');
    await queryInterface.dropTable('transactions_notes');
    await queryInterface.dropTable('transaction_assignee');
    await queryInterface.dropTable('states');
    await queryInterface.dropTable('processes');
    await queryInterface.dropTable('transaction_processes');
  },
};
