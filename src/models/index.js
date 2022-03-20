/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require('config/config');

const { dbHost, dbName, dbPassword, dbPort, dbUsername } = config;

/**
 * Object contains a configured sequelize instance with all app models.
 *
 * @type {{
 * sequelize: import('sequelize').Sequelize,
 * Sequelize: typeof import('Sequelize')
 * Company: import('./company')
 * Listing: import('./listing')
 * UserInfo: import('./user-info')
 * User: import('./user')
 * Features: import('./features')
 * ListingFeatures: import('./listing-features')
 * LoginProviders: import('./login-providers')
 * Roles: import('./roles')
 * UserRoles: import('./user-roles')
 * PropertyType: import('./property-type')
 * ListingType: import('./listing-type')
 * Schedule: import('./schedule')
 * SocialStatistics: import('./social-statistics')
 * SavedUsersListings: import('./saved-users-listings')
 * RatingCriteria: import('./rating-criteria')
 * Reviews: import('./reviews')
 * ReviewRatings: import('./review-ratings')
 * ScheduleVisit: import('./schedule-visit')
 * Invitations: import('./invitations')
 * TransactionWorkflowSteps: import('./transaction-workflow-steps')
 * Transactions: import('./transactions')
 * TransactionsNotes: import('./transactions-notes')
 * TransactionAssignee: import('./transaction-assignee')
 * States: import('./states')
 * Processes: import('./processes')
 * TransactionProcesses: import('./transaction-processes')
 * Documents: import('./documents')
 * DocumentsNames: import('./documents-names')
 * PurchaseOffer:import('./purchase-offer')
 * }}
 */
const db = {};

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  dialect: 'postgres',
  host: dbHost,
  port: dbPort,
  define: {
    // prevent sequelize from pluralizing table names
    freezeTableName: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  },
});

// /* eslint-disable import/no-dynamic-require, global-require */
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      ![path.basename(__filename), 'base-model.js', 'shared-columns'].includes(file) &&
      file.slice(-3) === '.js'
  )
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
