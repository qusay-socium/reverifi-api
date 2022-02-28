const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class SavedUsersListings extends BaseModel {
  static associate({ User, Listing }) {
    this.belongsTo(User, { as: 'savedUser', foreignKey: 'userId' });
    this.belongsTo(User, { as: 'savedByUser', foreignKey: 'savedBy' });
    this.belongsTo(Listing, { as: 'savedListing', foreignKey: 'listingId' });
  }
}

/**
 * @type {typeof SavedUsersListings}
 */
module.exports = (sequelize, DataTypes) => {
  SavedUsersListings.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      listingId: {
        type: DataTypes.UUID,
        field: 'listing_id',
        references: {
          model: 'listings',
          key: 'id',
        },
      },
      savedBy: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'saved_by',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'SavedUsersListings',
      tableName: 'saved_users_listings',
    }
  );

  return SavedUsersListings;
};
