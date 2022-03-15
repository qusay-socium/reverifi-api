const Router = require('express-promise-router');

const { apiGetAll } = require('middleware/api-methods');
const { Processes } = require('models');

const router = Router({ mergeParams: true });

/**
 * Handle GET to /api/processes route.
 */
router.get('/', apiGetAll(Processes));

module.exports = router;
