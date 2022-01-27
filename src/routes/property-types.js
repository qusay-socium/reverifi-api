const Router = require('express-promise-router');

const { apiGetPage } = require('middleware/api-methods');
const { PropertyType } = require('models');

const router = Router({ mergeParams: true });

/**
 * Handle GET to /api/property-types route.
 */
router.get('/', apiGetPage(PropertyType));

module.exports = router;
