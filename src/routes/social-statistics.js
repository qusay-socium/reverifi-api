const {
  getSavedUsersOrListings,
  saveUserOrListing,
  viewOrShareUserOrListing,
} = require('controllers/social-statistics');
const Router = require('express-promise-router');
const auth = require('middleware/auth');

const router = Router({ mergeParams: true });

/**
 * Handle GET /api/social-statistics route.
 */
router.get('/', auth, getSavedUsersOrListings);

/**
 * Handle PATCH /api/social-statistics route.
 */
router.patch('/', auth, saveUserOrListing);

/**
 * Handle POST /api/social-statistics route.
 */
router.post('/', viewOrShareUserOrListing);

module.exports = router;