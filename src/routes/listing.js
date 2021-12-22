const Router = require('./router');
const auth = require('../middleware/auth');
const { postListing, patchList, getListings, getListing, deleteListing } = require('../controller/listing');

const router = Router({ mergeParams: true });

router.get('/', auth, getListings);
router.post('/', auth, postListing);

router.get('/:id', auth, getListing);
router.patch('/', auth, patchList);
router.delete('/', auth, deleteListing);

module.exports = router;
