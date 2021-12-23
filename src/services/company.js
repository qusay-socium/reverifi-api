const { Company } = require('models');

/**
 * Insert new company.
 *
 * @param {Object} values
 *
 * @return {Promise<Object>}
 */
const addCompany = async (values) => {
  const createCompany = await Company.create(values);
  return createCompany.dataValues;
};

/**
 * Update  company.
 *
 * @param {Object} values
 *
 * @return {Promise<Object>}
 */
const updateCompany = async (values, id) => {
  const createCompany = await Company.update(values, { where: { id }, returning: true });

  return createCompany;
};

/**
 * Get all  companies.
 *
 * @param {Object} values
 *
 * @return {Promise<Object>}
 */
const getAllCompanies = async () => {
  const data = await Company.findAndCountAll();
  return data;
};

/**
 * Get company by id.
 *
 * @param {Object} values
 *
 * @return {Promise<Object>}
 */
const getCompanyById = async (id) => {
  const data = await Company.findOne({ where: { id } });
  return data;
};

/**
 * Remove specific company.
 *
 * @param {Object} articleId Article id.
 */
const removeCompany = async (id) => {
  const data = await Company.destroy({ where: { id }, returning: true });
  return data;
};

module.exports = { removeCompany, getAllCompanies, addCompany, updateCompany, getCompanyById };
