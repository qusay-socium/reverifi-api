const { createPurchaseOffer, getAllPurchaseOffers } = require('controllers/purchase-offer');
const Router = require('express-promise-router');
const auth = require('middleware/auth');

const router = Router({ mergeParams: true });

/**
 * Handle POST to /api/offer/:listingId route.
 */
router.post('/create', auth, createPurchaseOffer);

/**
 * Handle GET to /api/schedule/visit route.
 */
router.get('/', auth, getAllPurchaseOffers);

module.exports = router;
