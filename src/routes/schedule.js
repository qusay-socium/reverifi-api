const {
  createListingSchedule,
  createVisitListing,
  getListingSchedule,
} = require('controllers/listing');
const Router = require('express-promise-router');
const auth = require('middleware/auth');

const router = Router({ mergeParams: true });

/**
 * Handle patch to /api/schedule route.
 */
router.patch('/', auth, createListingSchedule);

/**
 * Handle POST to /api/schedule/visit route.
 */
router.post('/visit', auth, createVisitListing);

/**
 * Handle GET to /api/schedule/visit route.
 */
router.get('/:id', auth, getListingSchedule);

module.exports = router;
