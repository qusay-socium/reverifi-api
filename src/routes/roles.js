const Router = require('express-promise-router');

const { Roles } = require('models');
const auth = require('middleware/auth');
const { apiGetAll } = require('middleware/api-methods');

const router = Router({ mergeParams: true });

/**
 * Handle GET to /api/roles route.
 */
router.get('/', auth, apiGetAll(Roles));

module.exports = router;
