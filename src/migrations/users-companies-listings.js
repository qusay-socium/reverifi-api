module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sharedColumns = {
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      createdBy: {
        type: Sequelize.UUID,
        field: 'created_by',
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.literal('NOW() ON UPDATE NOW()'),
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

    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        field: 'is_verified',
      },
      ...sharedColumns,
    });

    await queryInterface.createTable('companies', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      website: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.JSON,
      },
      metadata: {
        type: Sequelize.JSON,
      },
      ...sharedColumns,
    });

    await queryInterface.createTable('user_infos', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
        field: 'user_id',
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        efaultValue: null,
        references: {
          model: 'companies',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        field: 'company_id',
      },
      address: {
        type: Sequelize.JSON,
      },
      website: {
        type: Sequelize.STRING,
      },
      languages: {
        type: Sequelize.ARRAY(Sequelize.STRING(55)),
      },
      serviceAreas: {
        type: Sequelize.ARRAY(Sequelize.STRING(55)),
        field: 'service_areas',
      },
      socials: {
        type: Sequelize.JSON,
      },
      aboutMe: {
        type: Sequelize.STRING,
        field: 'about_me',
      },
      ...sharedColumns,
    });

    await queryInterface.createTable('listings', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      agentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        field: 'agent_id',
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        field: 'owner_id',
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      price: {
        type: Sequelize.DOUBLE,
        defaultValue: 0.0,
      },
      description: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.JSON,
      },
      ...sharedColumns,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('listings');
    await queryInterface.dropTable('user_infos');
    await queryInterface.dropTable('companies');
    await queryInterface.dropTable('users');
  },
};
