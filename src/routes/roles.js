const Router = require('express-promise-router');

const { Roles } = require('models');
const auth = require('middleware/auth');
const { apiGetPage } = require('middleware/api-methods');

const router = Router({ mergeParams: true });

/**
 * Handle GET to /api/roles route.
 */
router.get('/', auth, apiGetPage(Roles));

module.exports = router;
