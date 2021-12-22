module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.TEXT,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(64),
        is: /^[0-9a-f]{64}$/i,
      },
      phone: {
        type: DataTypes.TEXT,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        field: 'is_verified',
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    });
    await queryInterface.createTable('companies', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.TEXT,
        unique: true,
      },
      website: {
        type: DataTypes.TEXT,
      },
      address: {
        type: DataTypes.JSON,
      },
      metadata: {
        type: DataTypes.JSON,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
    });
    await queryInterface.createTable('user_infos', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
        field: 'user_id',
      },
      companyId: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.JSON,
      },
      website: {
        type: DataTypes.TEXT,
      },
      languages: {
        type: DataTypes.ARRAY(DataTypes.STRING(55)),
      },
      serviceAreas: {
        type: DataTypes.ARRAY(DataTypes.STRING(55)),
        field: 'service_areas',
      },
      socials: {
        type: DataTypes.JSON,
      },
      aboutMe: {
        type: DataTypes.TEXT,
        field: 'about_me',
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
    });
    await queryInterface.createTable('listings', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      agentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        field: 'agent_id',
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        field: 'owner_id',
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      price: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      description: {
        type: DataTypes.TEXT,
      },
      address: {
        type: DataTypes.JSON,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_infos');
    await queryInterface.dropTable('companies');
    await queryInterface.dropTable('listings');
    await queryInterface.dropTable('users');
  },
};
