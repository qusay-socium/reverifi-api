const Router = require('express-promise-router');

const { apiGetAll } = require('middleware/api-methods');
const { ListingType } = require('models');

const router = Router({ mergeParams: true });

/**
 * Handle GET to /api/listing-types route.
 */
router.get('/', apiGetAll(ListingType));

module.exports = router;
