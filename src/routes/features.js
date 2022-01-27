const Router = require('express-promise-router');

const { apiGetPage } = require('middleware/api-methods');
const { Features } = require('models');

const router = Router({ mergeParams: true });

/**
 * Handle GET /api/features route.
 */
router.get('/', apiGetPage(Features));

module.exports = router;
