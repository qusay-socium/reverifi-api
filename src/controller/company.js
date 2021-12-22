const { removeCompany, addCompany, getCompanyById, updateCompany, getAllCompanies } = require('../services/company');

const response = require('../utils/response');

/**
 * Create new company.
 *
 * @param {express.Request}  req
 * @param {express.Response} res
 *
 * @return {Object}
 */
async function postCompany(req, res) {
  const data = await addCompany(req.body);

  res.json(response(data));
}

/**
 * Update  company.
 *
 * @param {express.Request}  req
 * @param {express.Response} res
 *
 * @return {Object}
 */
async function patchCompany(req, res) {
  const { id } = req.params;

  const data = await updateCompany(req.body, id);

  res.json(response(data));
}

/**
 * Get company by id.
 *
 * @param {express.Request}  req
 * @param {express.Response} res
 *
 * @return {Object}
 */
async function getCompany(req, res) {
  const { id } = req.params;

  const data = await getCompanyById(id);

  res.json(response(data));
}

/**
 * Get company.
 *
 * @param {express.Request}  req
 * @param {express.Response} res
 *
 * @return {Object}
 */
async function getCompanies(req, res) {
  const data = await getAllCompanies();
  res.json(response(data));
}

/**
 * Delete company.
 *
 * @param {express.Request}  req
 * @param {express.Response} res
 *
 * @return {Object}
 */
async function deleteCompany(req, res) {
  const { id } = req.params;
  await removeCompany(id);

  res.send('OK');
}

module.exports = { getCompanies, deleteCompany, postCompany, patchCompany, getCompany };
