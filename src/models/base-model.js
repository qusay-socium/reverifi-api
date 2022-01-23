const isEmpty = require('lodash/isEmpty');
const { Model } = require('sequelize');

class BaseModel extends Model {
  /**
   * Get the ID field.
   * Allows other models to use a different ID field.
   *
   * @return {string} ID field.
   */
  static getIdField() {
    return 'id';
  }

  /**
   * Create a new record.
   *
   * @param {Object} values  Data values.
   * @param {import("sequelize").CreateOptions} [options={}] Query options.
   *
   * @return {Promise<Object>} The created record JSON data.
   */
  static async createOne(values, options = {}) {
    const result = await this.create(values, options);

    return result.toJSON();
  }

  /**
   * Create multiple records.
   *
   * @param {Object[]} data A list data objects to insert.
   * @param {import("sequelize").BulkCreateOptions} [options={}] Query options.
   *
   * @return {Object[]} A list of created data.
   */
  static async createAll(data, options = {}) {
    const results = await this.bulkCreate(data, options);

    return results ? results.map((result) => result.toJSON()) : [];
  }

  /**
   * Update an existing records by condition.
   *
   * @param {import("sequelize").WhereOptions} condition The Query where condition.
   * @param {Object} values Data values.
   * @param {import("sequelize").UpdateOptions} [options={}] Query options.
   *
   * @return {Promise<Object[]>} The updated records JSON data.
   */
  static async updateByCondition(condition, values, options = {}) {
    const [, results] = await this.update(values, {
      where: condition,
      returning: true,
      ...options,
    });

    return results ? results.map((result) => result.toJSON()) : [];
  }

  /**
   * Update an existing record.
   *
   * @param {string} id Record ID.
   * @param {Object} values Data values.
   * @param {import("sequelize").UpdateOptions} [options={}] Query options.
   *
   * @return {Promise<Object>} The updated record JSON data.
   */
  static async updateOne(id, values, options = {}) {
    const data = await this.updateByCondition({ [this.getIdField()]: id }, values, options);

    return data[0];
  }

  /**
   * Get an existing record by condition.
   *
   * @param {import("sequelize").WhereOptions} condition The query where condition.
   * @param {import("sequelize").FindOptions} [options={}] Query options.
   *
   * @return {Promise<Object>} The record JSON data.
   */
  static async getOneByCondition(condition, options = {}) {
    const result = await this.findOne({ where: condition, ...options });

    return result ? result.toJSON() : undefined;
  }

  /**
   * Get an existing record.
   *
   * @param {string} id Record ID.
   * @param {import("sequelize").FindOptions} [options={}] Query options.
   *
   * @return {Promise<Object>} The Record JSON data.
   */
  static async getOne(id, options = {}) {
    const data = await this.getOneByCondition({ [this.getIdField()]: id }, options);

    return data;
  }

  /**
   * Get a list of records.
   *
   * @param {import("sequelize").FindOptions} [options={}] Query options.
   *
   * @return {Promise<Object[]>} A list of records JSON data.
   */
  static async getAll(options = {}) {
    const results = await this.findAll(options);

    return results.map((result) => result.toJSON());
  }

  /**
   * Get a list of records by condition.
   *
   * @param {import("sequelize").WhereOptions} condition The query where condition.
   * @param {import("sequelize").FindOptions} [options={}] Query options.
   *
   * @return {Promise<Object[]>} A list of records JSON data.
   */
  static async getAllByCondition(condition, options = {}) {
    const data = await this.getAll({ where: condition, ...options });

    return data;
  }

  /**
   * Get the total count.
   *
   * @param {import("sequelize").CountOptions} [options={}] Query options.
   *
   * @return {Promise<number>} The number of total records.
   */
  static async getCount(options = {}) {
    const result = await this.count(options);

    return result;
  }

  /**
   * Delete existing records by condition.
   *
   * @param {import("sequelize").WhereOptions} condition The query where condition.
   * @param {import("sequelize").DestroyOptions} [options={}] Query options.
   *
   * @return {Promise<number>} The number of deleted records.
   */
  static async deleteByCondition(condition, options = {}) {
    const result = await this.destroy({ where: condition, ...options });

    return result;
  }

  /**
   * Delete an existing record.
   *
   * @param {string} id Record ID
   * @param {import("sequelize").DestroyOptions} [options={}] Query options.
   *
   * @return {Promise<number>} The number of deleted records.
   */
  static async deleteOne(id, options = {}) {
    const result = await this.deleteByCondition({ [this.getIdField()]: id }, options);

    return result;
  }

  /**
   * Check if a record exists.
   *
   * @param {string} id Record ID.
   *
   * @return {Promise<boolean>} True if the record exists.
   */
  static async exists(id) {
    const result = await this.getOne(id);

    return !isEmpty(result);
  }
}

module.exports = BaseModel;
