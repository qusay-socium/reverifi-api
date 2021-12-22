const Router = require('./router');
const { SchemaValidator, Auth } = require('../middlewares');
const { ListingRouteSchema, ListingRouteUpdateSchema } = require('./schemas');
const { ListingRepo } = require('../dataAccess');
const { StatusCode } = require('../constants');

const router = Router({ mergeParams: true });

router.post('/', [SchemaValidator.body(ListingRouteSchema.body), Auth.authenticateToken], async (req, res) => {
  const listing = await ListingRepo.create(req.user.id, req.body);
  res.status(StatusCode.CREATED).json(listing);
});

router.patch('/:id', [SchemaValidator.body(ListingRouteUpdateSchema.body), Auth.authenticateToken], async (req, res) => {
  const updatedListing = await ListingRepo.update(req.user.id, req.body, req.params.id);
  return updatedListing ? res.status(StatusCode.CREATED).json(updatedListing) : res.status(StatusCode.NOT_FOUND).send('Item not found!');
});

router.get('/', [SchemaValidator.query(ListingRouteSchema.query), Auth.authenticateToken], async (req, res) => {
  const listings = await ListingRepo.filter(req.user.id);
  if (!listings) return res.status(StatusCode.NOT_FOUND).send('No Items found!');
  res.status(StatusCode.OK).json(listings);
});

router.get('/:id', [SchemaValidator.params(ListingRouteSchema.params), Auth.authenticateToken], async (req, res) => {
  const listing = await ListingRepo.get(req.user.id, req.params.id);
  if (!listing) return res.status(StatusCode.NOT_FOUND).send('Item not found!');
  res.status(StatusCode.OK).json(listing);
});

router.delete('/:id', [Auth.authenticateToken], async (req, res) => {
  const deletedListing = await ListingRepo.delete(req.user.id, req.params.id);
  if (!deletedListing) return res.status(StatusCode.NOT_FOUND).send('Item not found!');
  res.status(StatusCode.OK).json(deletedListing);
});

module.exports = router;
