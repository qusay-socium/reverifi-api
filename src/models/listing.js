const { Sequelize, Op } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class Listing extends BaseModel {
  static associate({ User, Features, PropertyType, ListingType }) {
    this.belongsTo(User, { as: 'agent', foreignKey: 'agentId' });
    this.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });
    this.belongsTo(PropertyType, { as: 'propertyType', foreignKey: 'property_type_id' });
    this.belongsTo(ListingType, { as: 'listingType', foreignKey: 'listing_type_id' });
    this.belongsToMany(Features, {
      through: 'ListingFeatures',
      foreignKey: 'listing_id',
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
        { model: this.sequelize.models.User, as: 'owner', attributes: { exclude: ['password'] } },
        { model: this.sequelize.models.User, as: 'agent', attributes: { exclude: ['password'] } },
        'features',
        {
          model: this.sequelize.models.Features,
          as: 'features',
          attributes: ['id', 'feature'],
          through: { attributes: [] },
        },
      ],
    });

    return result;
  }

  /**
   * Get all listing with owner,agent & features.
   *
   * @param {number} page The page number.
   * @param {number} limit The records limit per page.
   * @param {string} [userId=null] The listing owner or agent ID,
   *                               if provided only listing for this user will be retrieved.
   *
   * @return {Promise<{data:Object[], count:number}>} Listing data.
   */
  static async getPageWithRelations(page, limit, userId = null) {
    const { User, UserInfo, Features, ListingType, PropertyType } = this.sequelize.models;

    const result = await this.getPage(
      page,
      limit,
      userId ? { [Op.or]: [{ ownerId: userId }, { agentId: userId }] } : {},
      {
        include: [
          {
            model: User,
            as: 'agent',
            attributes: ['id', 'name'],
            include: [{ model: UserInfo, as: 'userInfo', attributes: ['image'] }, 'roles'],
          },
          {
            model: User,
            as: 'owner',
            attributes: ['id', 'name'],
            include: [{ model: UserInfo, as: 'userInfo', attributes: ['image'] }, 'roles'],
          },
          {
            model: Features,
            as: 'features',
            attributes: ['feature'],
            through: { attributes: [] },
          },
          {
            model: ListingType,
            as: 'listingType',
            attributes: ['type'],
          },
          {
            model: PropertyType,
            as: 'propertyType',
            attributes: ['type'],
          },
        ],
      }
    );
    return result;
  }

  /**
   * Search by city or aip code.
   *
   * @param {string} [value=''] Search value.
   *
   * @return {Promise<Object[]>} Listing data.
   */
  static async searchByCityOrZipCode(value = '') {
    const result = await this.getAll({
      where: {
        [Op.or]: { city: { [Op.like]: `%${value}%` }, zipCode: { [Op.like]: `%${value}%` } },
      },
      include: [
        {
          model: this.sequelize.models.User,
          as: 'agent',
          attributes: ['id'],
          include: ['roles'],
        },
        {
          model: this.sequelize.models.Features,
          as: 'features',
          attributes: ['id', 'feature'],
          through: { attributes: [] },
        },
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
          model: 'users',
          key: 'id',
        },
        field: 'agent_id',
      },
      ownerId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'users',
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
