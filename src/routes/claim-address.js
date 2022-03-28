const { addListingClaim, getClaims } = require('controllers/claim-address');
const Router = require('express-promise-router');

const auth = require('middleware/auth');

const router = Router({ mergeParams: true });

/**
 * Handle GET to /api/claim-address route.
 */
router.get('/', auth, getClaims);

/**
 * Handle POST to /api/claim-address route.
 */
router.post('/', auth, addListingClaim);

module.exports = router;
