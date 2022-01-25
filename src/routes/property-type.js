const Router = require('express-promise-router');

const { apiGetAll } = require('middleware/api-methods');
const { PropertyType } = require('models');

const router = Router({ mergeParams: true });

/**
 * Handle GET to /api/property-types route.
 */
router.get('/', apiGetAll(PropertyType));

module.exports = router;
