const Router = require('express-promise-router');

const auth = require('middleware/auth');
const {
  getAllListings,
  createListing,
  updateListing,
  deleteListing,
  getListingById,
  getFeaturedListings,
  searchListingsByCityOrZipCode,
} = require('controllers/listing');

const router = Router({ mergeParams: true });

/**
 * Handle GET to /api/listings/featured route.
 */
router.get('/featured', getFeaturedListings);

/**
 * Handle GET to /api/listings/search route.
 */
router.get('/search', searchListingsByCityOrZipCode);

/**
 * Handle GET to /api/listings route.
 */
router.get('/', auth, getAllListings);
/**
 * Handle POST to /api/listings route.
 */
router.post('/', auth, createListing);

/**
 * Handle PATCH to /api/listings route.
 */
router.patch('/:id', auth, updateListing);

/**
 * Handle DELETE to /api/listings route.
 */
router.delete('/:id', auth, deleteListing);

/**
 * Handle GET to /api/listings/:id route.
 */
router.get('/:id', getListingById);

module.exports = router;
