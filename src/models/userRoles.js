const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');

class UserRoles extends BaseModel {
  /**
   * Insert bulk.
   *
   * @param {Array} listingFeaturesId userId & roleId.
   *
   * @return {Promise<Object[]>} User & roles id.
   */
  static async createGroupe(userRolesId) {
    const result = await this.bulkCreate(userRolesId);
    return result;
  }
}

/**
 * @type {typeof UserRoles}
 */
module.exports = (sequelize, DataTypes) => {
  UserRoles.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'role_id',
        references: {
          model: 'roles',
          key: 'id',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: 'UserRoles',
      tableName: 'user_roles',
    }
  );
  return UserRoles;
};
