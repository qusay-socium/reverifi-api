const { getListingClaim, addListingClaim, getAllClaims } = require('controllers/claim-address');
const Router = require('express-promise-router');

const auth = require('middleware/auth');

const router = Router({ mergeParams: true });

/**
 * Handle GET to /api/claim-address/:id route.
 */
router.get('/:id', auth, getListingClaim);

/**
 * Handle GET to /api/claim-address route.
 */
router.get('/', auth, getAllClaims);

/**
 * Handle POST to /api/claim-address route.
 */
router.post('/', auth, addListingClaim);

module.exports = router;
