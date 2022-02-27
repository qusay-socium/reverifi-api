const { createListingSchedule } = require('controllers/listing');
const Router = require('express-promise-router');
const auth = require('middleware/auth');

const router = Router({ mergeParams: true });

/**
 * Handle POST to /api/schedule route.
 */
router.post('/', auth, createListingSchedule);

module.exports = router;
