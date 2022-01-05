module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('listings', 'country', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('listings', 'per_period', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('listings', 'offer_type', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('listings', 'lang', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('listings', 'lat', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('listings', 'city', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('listings', 'zip_code', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('listings', 'street', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('listings', 'property_type', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('listings', 'listing_type', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('listings', 'year_built', {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn('listings', 'bedrooms', {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn('listings', 'full_bathrooms', {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn('listings', 'partial_bathrooms', {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn('listings', 'home_area', {
      type: Sequelize.JSON,
    });

    await queryInterface.addColumn('listings', 'lot_area', {
      type: Sequelize.JSON,
    });

    await queryInterface.addColumn('listings', 'lot_dimensions', {
      type: Sequelize.DOUBLE,
    });

    await queryInterface.addColumn('listings', 'rooms', {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn('listings', 'garage', {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn('listings', 'status', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('listings', 'property_condition', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('listings', 'analytics', {
      type: Sequelize.JSON,
    });

    await queryInterface.renameColumn('listings', 'description', 'overview');

    await queryInterface.changeColumn('listings', 'address', {
      type: Sequelize.STRING,
    });

    await queryInterface.removeConstraint('listings', 'listings_agent_id_key');

    await queryInterface.removeConstraint('listings', 'listings_owner_id_key');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('listings', 'country');
    await queryInterface.removeColumn('listings', 'offer_type');
    await queryInterface.removeColumn('listings', 'per_period');
    await queryInterface.removeColumn('listings', 'city');
    await queryInterface.removeColumn('listings', 'zip_code');
    await queryInterface.removeColumn('listings', 'street');
    await queryInterface.removeColumn('listings', 'point');
    await queryInterface.removeColumn('listings', 'property_type');
    await queryInterface.removeColumn('listings', 'listing_type');
    await queryInterface.removeColumn('listings', 'year_built');
    await queryInterface.removeColumn('listings', 'bedrooms');
    await queryInterface.removeColumn('listings', 'full_bathrooms');
    await queryInterface.removeColumn('listings', 'partial_bathrooms');
    await queryInterface.removeColumn('listings', 'home_area');
    await queryInterface.removeColumn('listings', 'lot_area');
    await queryInterface.removeColumn('listings', 'lot_dimensions');
    await queryInterface.removeColumn('listings', 'rooms');
    await queryInterface.removeColumn('listings', 'garage');
    await queryInterface.removeColumn('listings', 'status');
    await queryInterface.removeColumn('listings', 'property_condition');
    await queryInterface.removeColumn('listings', 'analytics');
    await queryInterface.removeColumn('listings', 'lang');
    await queryInterface.removeColumn('listings', 'lat');
    await queryInterface.changeColumn('listings', 'address', {
      type: Sequelize.JSON,
    });
    await queryInterface.renameColumn('listings', 'overview', 'description');
    await queryInterface.changeColumn('listings', 'agent_id', {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: 'users',
        key: 'id',
      },
    });
    await queryInterface.changeColumn('listings', 'owner_id', {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: 'users',
        key: 'id',
      },
    });
  },
};
