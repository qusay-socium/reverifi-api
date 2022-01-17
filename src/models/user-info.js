const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class UserInfo extends BaseModel {
  static associate({ User, Company }) {
    this.belongsTo(User, { as: 'user', foreignKey: 'userId' });
    this.belongsTo(Company, { as: 'company', foreignKey: 'companyId' });
  }

  /**
   * Update user info by user ID.
   *
   * @param {string} userId The user ID.
   * @param {Object} values The new data for updating user-info.
   *
   * @return {Promise<Object>} The updated user info data.
   */
  static async updateByUserId(userId, values) {
    const [result] = await this.updateByCondition({ userId }, values);
    return result;
  }

  /**
   * Get user info with user and company.
   *
   * @param {string} id The user info ID.
   *
   * @return {Promise<Object>} The user info data.
   */
  static async getOneWithUserAndCompany(id) {
    const result = await this.getOne(id, {
      include: ['user', 'company'],
    });
    return result;
  }

  /**
   * Get all user info with user and company.
   *
   * @return {Promise<Object[]>} All user info data.
   */
  static async getAllWithUserAndCompany() {
    const result = await this.getAll({
      include: ['user', 'company'],
    });
    return result;
  }

  /**
   * Delete user info by user ID.
   *
   * @param {string} userId The user ID.
   *
   * @return {Promise<number>} The number of deleted items.
   */
  static async deleteByUserId(userId) {
    const result = await this.deleteByCondition({ userId });
    return result;
  }
}

/**
 * @type {typeof UserInfo}
 */
module.exports = (sequelize, DataTypes) => {
  UserInfo.init(
    {
      id: {
        description: 'Primary key',
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        onUpdate: 'cascade',
        onDelete: 'cascade ',
        field: 'user_id',
      },
      companyId: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null,
        onUpdate: 'cascade',
        onDelete: 'cascade',
        field: 'company_id',
      },
      address: {
        type: DataTypes.JSON,
      },
      website: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        field: 'about_me',
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      tableName: 'user_infos',
      modelName: 'UserInfo',
    }
  );
  return UserInfo;
};
