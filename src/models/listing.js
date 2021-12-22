const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    static associate({ User }) {
      this.belongsTo(User, { as: 'userOwner', foreignKey: 'ownerId' });
    }
  }
  Listing.init(
    {
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
    },
    {
      sequelize,
      tableName: 'listings',
      modelName: 'Listing',
    }
  );
  return Listing;
};
