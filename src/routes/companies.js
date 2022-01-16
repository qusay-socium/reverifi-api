const Router = require('express-promise-router');

const { Company } = require('models');
const auth = require('middleware/auth');
const { apiGetAll, apiPost, apiGet, apiPatch, apiDelete } = require('middleware/api-methods');

const router = Router({ mergeParams: true });

/**
 * Handle GET to /api/companies route.
 */
router.get('/', auth, apiGetAll(Company));

/**
 * Handle POST to /api/companies route.
 */
router.post('/', auth, apiPost(Company));

/**
 * Handle GET to /api/companies/:id route.
 */
router.get('/:id', auth, apiGet(Company));

/**
 * Handle PATCH to /api/companies/:id route.
 */
router.patch('/:id', auth, apiPatch(Company));

/**
 * Handle DELETE to /api/companies/:id route.
 */
router.delete('/:id', auth, apiDelete(Company));

module.exports = router;
