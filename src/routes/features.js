const Router = require('express-promise-router');

const { apiGetAll } = require('middleware/api-methods');
const { Features } = require('models');

const router = Router({ mergeParams: true });

/**
 * Handle GET /api/features route.
 */
router.get('/', apiGetAll(Features));

module.exports = router;
