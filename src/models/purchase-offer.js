const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class PurchaseOffer extends BaseModel {
  static associate({ Listing, User }) {
    this.belongsTo(Listing, { as: 'listingOffer', foreignKey: 'listingId' });
    this.belongsTo(User, { as: 'offeredUser', foreignKey: 'createdBy' });
  }
}

/**
 * @type {typeof PurchaseOffer}
 */
module.exports = (sequelize, DataTypes) => {
  PurchaseOffer.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      listingId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'listing_id',
        references: {
          model: 'listings',
          key: 'id',
        },
      },
      attachments: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      price: {
        field: 'price',
        type: DataTypes.STRING,
        defaultValue: null,
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      modelName: 'PurchaseOffer',
      tableName: 'purchase_offer',
    }
  );
  return PurchaseOffer;
};
