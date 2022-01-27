const pickBy = require('lodash/pickBy');
const snakeCase = require('lodash/snakeCase');
const { Sequelize } = require('sequelize');
const response = require('utils/response');
const { NotFound } = require('lib/errors');

/**
 * Build sequelize query conditions based on the URL query.
 *
 * @param {Object} query URL query.
 *
 * @return {Object[]} Sequelize query conditions.
 */
const getQueryConditions = (query) =>
  Object.keys(query).map((key) => {
    const [field, op] = key.split(':');

    const value = query[key].includes(',') ? query[key].split(',') : query[key];

    const filterValue = op && Sequelize.Op[op] ? { [Sequelize.Op[op]]: value } : value;

    return { [snakeCase(field)]: filterValue };
  });

/**
 * Get a middleware that handles get all requests for a model.
 *
 * @param {import('models/base-model')} model Sequelize data model.
 * @param {import("sequelize").FindOptions} [options={}] Query options.
 */
const apiGetAll =
  (model, options = {}) =>
  /**
   * Get page middleware.
   *
   * @param {import('express').Request} req Express route request.
   * @param {import('express').Response} res Express route response.
   */
  async (req, res) => {
    const modelAttributes = Object.keys(model.rawAttributes);
    const where = getQueryConditions(
      pickBy(req.query, (value, key) => modelAttributes.includes(key.split(':')[0]))
    );

    const data = await model.getAll({
      ...options,
      where: [...(where || []), ...(options.where || [])],
    });

    res.json(response({ data }));
  };

/**
 * Get a middleware that handles get page requests for a model.
 *
 * @param {import('models/base-model')} model Sequelize data model.
 * @param {import("sequelize").FindOptions} [options={}] Query options.
 */
const apiGetPage =
  (model, options = {}) =>
  /**
   * Get all middleware.
   *
   * @param {import('express').Request} req Express route request.
   * @param {import('express').Response} res Express route response.
   */
  async (req, res) => {
    const {
      query: {
        page = 1,
        limit = 30,
        sort: sortField = model.getIdField(),
        order: sortOrder = 'desc',
        ...query
      },
    } = req;

    const modelAttributes = Object.keys(model.rawAttributes);
    const where = getQueryConditions(
      pickBy(query, (value, key) => modelAttributes.includes(key.split(':')[0]))
    );
    const offset = (page - 1) * limit;
    const order = [[sortField, sortOrder]];

    const data = await model.getAll({
      offset,
      limit,
      order,
      ...options,
      where: [...(where || []), ...(options.where || [])],
    });

    const totalCount = await model.getCount({ where });

    res.json(response({ data, totalCount, resultCount: data.length }));
  };

/**
 * Get a middleware that handles get requests for a model.
 *
 * @param {import('models/base-model')} model Sequelize data model.
 * @param {import("sequelize").FindOptions} [options={}] Query options.
 */
const apiGet =
  (model, options = {}) =>
  /**
   * Get middleware.
   *
   * @param {import('express').Request} req Express route request.
   * @param {import('express').Response} res Express route response.
   */
  async (req, res) => {
    const id = req.params[model.getIdField()];
    const data = await model.getOne(id, options);
    if (!data) {
      throw new NotFound('Data not found');
    }
    res.json(response({ data }));
  };

/**
 * Get a middleware that handles post requests for a model.
 *
 * @param {import('models/base-model')} model Sequelize data model.
 * @param {import("sequelize").CreateOptions} [options={}] Query options.
 */
const apiPost =
  (model, options = {}) =>
  /**
   * Post middleware.
   *
   * @param {import('express').Request} req Express route request.
   * @param {import('express').Response} res Express route response.
   */
  async (req, res) => {
    const data = await model.createOne(req.body, options);

    res.json(response({ data }));
  };

/**
 * Get a middleware that handles patch requests for a model.
 *
 * @param {import('models/base-model')} model Sequelize data model.
 * @param {import("sequelize").UpdateOptions} [options={}] Query options.
 */
const apiPatch =
  (model, options = {}) =>
  /**
   * Patch middleware.
   *
   * @param {import('express').Request} req Express route request.
   * @param {import('express').Response} res Express route response.
   */
  async (req, res) => {
    const id = req.params[model.getIdField()];

    const data = await model.updateOne(id, req.body, options);
    if (!data) {
      throw new NotFound('Data not found');
    }

    res.json(response({ data }));
  };

/**
 * Get a middleware that handles delete requests for a model.
 *
 * @param {import('models/base-model')} model Sequelize data model.
 * @param {import("sequelize").DestroyOptions} [options={}] Query options.
 */
const apiDelete =
  (model, options = {}) =>
  /**
   * Delete middleware.
   *
   * @param {import('express').Request} req Express route request.
   * @param {import('express').Response} res Express route response.
   */
  async (req, res) => {
    const id = req.params[model.getIdField()];

    const count = await model.deleteOne(id, options);
    if (count <= 0) {
      throw new NotFound('Data not found');
    }

    res.json(response());
  };

module.exports = {
  apiGetAll,
  apiGetPage,
  apiPost,
  apiPatch,
  apiGet,
  apiDelete,
};
