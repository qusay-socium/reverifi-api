const Router = require('express-promise-router');

const auth = require('middleware/auth');
const {
  postListing,
  patchList,
  getListings,
  getListing,
  deleteListing,
  getListingsFeature,
} = require('controllers/listing');

const router = Router({ mergeParams: true });

/**
 * Listing routes.
 */
router.get('/', auth, getListings);
router.patch('/', auth, patchList);
router.post('/', auth, postListing);
router.delete('/', auth, deleteListing);

router.get('/feature/:page', getListingsFeature);
router.get('/:id', auth, getListing);

module.exports = router;
