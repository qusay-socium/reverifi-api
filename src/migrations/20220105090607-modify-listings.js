module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('listings', 'country', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('listings', 'perPeriod', {
      type: Sequelize.STRING,
      field: 'per_period',
    });

    await queryInterface.addColumn('listings', 'offerType', {
      type: Sequelize.STRING,
      field: 'offer_type',
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

    await queryInterface.addColumn('listings', 'zipCode', {
      type: Sequelize.STRING,
      field: 'zip_code',
    });

    await queryInterface.addColumn('listings', 'street', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('listings', 'propertyType', {
      type: Sequelize.STRING,
      field: 'property_type',
    });

    await queryInterface.addColumn('listings', 'listingType', {
      type: Sequelize.STRING,
      field: 'listing_type',
    });

    await queryInterface.addColumn('listings', 'yearBuilt', {
      type: Sequelize.INTEGER,
      field: 'year_built',
    });

    await queryInterface.addColumn('listings', 'bedrooms', {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn('listings', 'fullBathrooms', {
      type: Sequelize.INTEGER,
      field: 'full_bathrooms',
    });

    await queryInterface.addColumn('listings', 'partialBathrooms', {
      type: Sequelize.INTEGER,
      field: 'partial_bathrooms',
    });

    await queryInterface.addColumn('listings', 'homeArea', {
      type: Sequelize.JSON,
      field: 'home_area',
    });

    await queryInterface.addColumn('listings', 'lotArea', {
      type: Sequelize.JSON,
      field: 'lot_area',
    });

    await queryInterface.addColumn('listings', 'lotDimensions', {
      type: Sequelize.DOUBLE,
      field: 'lot_dimensions',
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

    await queryInterface.addColumn('listings', 'propertyCondition', {
      type: Sequelize.STRING,
      field: 'property_condition',
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

    await queryInterface.changeColumn('listings', 'agentId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      field: 'agent_id',
    });

    await queryInterface.changeColumn('listings', 'ownerId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      field: 'owner_id',
    });
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
