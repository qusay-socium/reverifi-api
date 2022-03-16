const { Sequelize } = require('sequelize');
const BaseModel = require('models/base-model');
const getSharedColumns = require('models/shared-columns');

class User extends BaseModel {
  static associate({
    UserInfo,
    Listing,
    Roles,
    UserRoles,
    SocialStatistics,
    SavedUsersListings,
    Reviews,
    ScheduleVisit,
    Invitations,
    Transactions,
    TransactionAssignee,
    Documents,
  }) {
    this.hasOne(UserInfo, { as: 'userInfo', foreignKey: 'userId' });
    this.hasOne(Listing, { as: 'agent', foreignKey: 'agentId' });
    this.hasOne(Listing, { as: 'ownedListing', foreignKey: 'ownerId' });
    this.belongsToMany(Roles, {
      through: UserRoles,
      foreignKey: 'userId',
      as: 'roles',
    });
    this.hasOne(SocialStatistics, { as: 'userSocial', foreignKey: 'userId' });
    this.hasOne(SavedUsersListings, { as: 'savedUser', foreignKey: 'userId' });
    this.hasOne(SavedUsersListings, { as: 'savedByUser', foreignKey: 'savedBy' });
    this.hasMany(Reviews, { as: 'reviewedUser', foreignKey: 'userId' });
    this.hasMany(Reviews, { as: 'reviewer', foreignKey: 'reviewerId' });
    this.hasMany(ScheduleVisit, { as: 'visitor', foreignKey: 'userId' });
    this.hasMany(Invitations, { as: 'inviter', foreignKey: 'inviteById' });
    this.hasMany(Invitations, { as: 'invitedUser', foreignKey: 'invitedUserId' });
    this.hasMany(Transactions, { as: 'createdByUser', foreignKey: 'createdBy' });
    this.hasMany(TransactionAssignee, { as: 'assignedUser', foreignKey: 'userId' });
    this.hasMany(Documents, { as: 'documentUser', foreignKey: 'createdBy' });
  }

  /**
   * Get user with roles.
   *
   * @param {string} email User email.
   *
   * @return {Promise<Object>} The user data.
   */
  static async getUserWithRoles(email) {
    const result = await this.getOneByCondition({ email }, { include: ['roles'] });

    return result;
  }
}

/**
 * @type {typeof User}
 */
module.exports = (sequelize, DataTypes) => {
  User.init(
    {
      id: {
        description: 'Primary key',
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      points: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        field: 'is_verified',
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      provider: {
        type: DataTypes.ENUM('Email', 'Facebook', 'Google'),
        defaultValue: 'Email',
      },
      ...getSharedColumns(sequelize, DataTypes),
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  );
  return User;
};
