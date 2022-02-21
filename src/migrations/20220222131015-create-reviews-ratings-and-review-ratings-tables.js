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

    await queryInterface.createTable('reviews', {
      id: {
        description: 'Primary key',
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
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      reviewerId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'reviewer_id',
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      review: {
        type: Sequelize.STRING(500),
      },
      ...sharedColumns,
    });

    await queryInterface.createTable('rating_criteria', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      criteria: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ...sharedColumns,
    });

    await queryInterface.createTable('review_ratings', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      reviewId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'review_id',
        references: {
          model: 'reviews',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      ratingCriteriaId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'rating_criteria_id',
        references: {
          model: 'rating_criteria',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade ',
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        field: 'is_deleted',
        defaultValue: false,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reviews');
    await queryInterface.dropTable('rating_criteria');
    await queryInterface.dropTable('review_ratings');
  },
};
