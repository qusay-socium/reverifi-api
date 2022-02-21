const Router = require('express-promise-router');

const { apiGetAll } = require('middleware/api-methods');
const { RatingCriteria } = require('models');

const router = Router({ mergeParams: true });

/**
 * Handle GET to /api/rating-criteria route.
 */
router.get('/', apiGetAll(RatingCriteria, { attributes: ['id', 'criteria'] }));

module.exports = router;
