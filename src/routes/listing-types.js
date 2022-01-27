const Router = require('express-promise-router');

const { apiGetPage } = require('middleware/api-methods');
const { ListingType } = require('models');

const router = Router({ mergeParams: true });

/**
 * Handle GET to /api/listing-types route.
 */
router.get('/', apiGetPage(ListingType));

module.exports = router;
