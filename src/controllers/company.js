const { NotFound } = require('lib/errors');
const {
  removeCompany,
  addCompany,
  getCompanyById,
  updateCompany,
  getAllCompanies,
} = require('services/company');
const response = require('utils/response');

/**
 * Create new company.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const createCompany = async (req, res) => {
  const data = await addCompany(req.body);

  res.json(response(data));
};

/**
 * Update  company.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const patchCompany = async (req, res) => {
  const { id } = req.params;

  const data = await updateCompany(req.body, id);

  res.json(response(data));
};

/**
 * Get company by id.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getCompany = async (req, res) => {
  const { id } = req.params;

  const data = await getCompanyById(id);

  res.json(response(data));
};

/**
 * Get company.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getCompanies = async (req, res) => {
  const data = await getAllCompanies();
  res.json(response(data));
};

/**
 * Delete company.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const deleteCompany = async (req, res) => {
  const { id } = req.params;

  const valid = await removeCompany(id);
  if (!valid) {
    throw new NotFound('Company not exist.');
  }

  res.json(response(undefined, 200, 'Company Deleted'));
};

module.exports = { getCompanies, deleteCompany, createCompany, patchCompany, getCompany };
