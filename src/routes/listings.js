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
  updateListingTransaction,
  addOrUpdateListingImages,
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
router.get('/:id', getAllListings);

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
 * Handle GET to /api/listings/listing/:id route.
 */
router.get('/listing/:id', getListingById);

/**
 * Handle GET to /api/listings/transaction/close route.
 */
router.patch('/transaction/close', updateListingTransaction);

/**
 * Handle GET to /api/listings/images/:id route.
 */
router.patch('/images/:id', auth, addOrUpdateListingImages);

module.exports = router;
