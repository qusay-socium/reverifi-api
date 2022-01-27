const { Sequelize, Op } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');
const { User } = require('models');

class Listing extends BaseModel {
  static associate({ User, Features, PropertyType, ListingType }) {
    this.belongsTo(User, { as: 'agent', foreignKey: 'agentId' });
    this.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });
    this.belongsTo(PropertyType, { as: 'propertyType', foreignKey: 'property_type_id' });
    this.belongsTo(ListingType, { as: 'listingType', foreignKey: 'listing_type_id' });
    this.belongsToMany(Features, {
      through: 'ListingFeatures',
      foreignKey: 'listingId',
      as: 'features',
    });
  }

  /**
   * Get listing with owner.
   *
   * @param {string} id The listing ID.
   *
   * @return {Promise<Object>} The listing data.
   */
  static async getOneWithOwnerAndAgent(id) {
    const result = await this.getOne(id, {
      include: [
        { model: User, as: 'owner', attributes: { exclude: ['password'] } },
        { model: User, as: 'agent', attributes: { exclude: ['password'] } },
        'features',
      ],
    });

    return result;
  }

  /**
   * Get all listing with owner,agent & features.
   *
   * @param {string} [userId=null] The listing owner or agent ID, if provided only listing for this user will be retrieved.
   *
   * @return {Promise<Object[]>} All listing data.
   */
  static async getAllWithRelations(userId = null) {
    const result = await this.getAll({
      ...(userId ? { where: { [Op.or]: [{ ownerId: userId }, { agentId: userId }] } } : {}),
      include: [
        { model: User, as: 'owner', attributes: { exclude: ['password'] } },
        { model: User, as: 'agent', attributes: { exclude: ['password'] } },
        'features',
      ],
    });
    return result;
  }
}

/**
 * @type {typeof Listing}
 */
module.exports = (sequelize, DataTypes) => {
  Listing.init(
    {
      id: {
        description: 'Primary key',
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      agentId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'User',
          key: 'id',
        },
        field: 'agent_id',
      },
      ownerId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'User',
          key: 'id',
        },
        field: 'owner_id',
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      price: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      country: {
        type: DataTypes.STRING,
      },
      lang: {
        type: DataTypes.STRING,
      },
      lat: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      zipCode: {
        type: DataTypes.STRING,
        field: 'zip_code',
      },
      street: {
        type: DataTypes.STRING,
      },
      propertyTypeId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'property_type',
          key: 'id',
        },
        field: 'property_type_id',
      },
      listingTypedId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'listing_type',
          key: 'id',
        },
        field: 'listing_type_id',
      },
      bedrooms: {
        type: DataTypes.INTEGER,
      },
      fullBathrooms: {
        type: DataTypes.INTEGER,
        field: 'full_bathrooms',
      },
      partialBathrooms: {
        type: DataTypes.INTEGER,
        field: 'partial_bathrooms',
      },
      homeArea: {
        type: DataTypes.JSON,
        field: 'home_area',
      },
      lotArea: {
        type: DataTypes.JSON,
        field: 'lot_area',
      },
      lotDimensions: {
        type: DataTypes.JSON,
        field: 'lot_dimensions',
      },
      rooms: {
        type: DataTypes.INTEGER,
      },
      garage: {
        type: DataTypes.INTEGER,
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      yearBuilt: {
        type: DataTypes.INTEGER,
        field: 'year_built',
      },
      overview: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      perPeriod: {
        type: DataTypes.STRING,
        field: 'per_period',
      },
      offerType: {
        type: DataTypes.STRING,
        field: 'offer_type',
      },
      analytics: {
        type: DataTypes.JSON,
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      tableName: 'listings',
      modelName: 'Listing',
    }
  );
  return Listing;
};
