const { getReviews, addReview, updateReview } = require('controllers/review');
const Router = require('express-promise-router');

const auth = require('middleware/auth');

const router = Router({ mergeParams: true });

/**
 * Handle GET to /api/reviews/:id route.
 */
router.get('/:id', getReviews);

/**
 * Handle POST to /api/reviews route.
 */
router.post('/', auth, addReview);

/**
 * Handle PATCH to /api/reviews route.
 */
router.patch('/', auth, updateReview);

module.exports = router;
