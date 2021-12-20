import expessRouter from 'express-async-router';
import { SchemaValidator, Auth } from '../middlewares';
import { ListingRouteSchema, ListingRouteUpdateSchema } from './schemas';
import { ListingRepo } from '../dataAccess';
import { StatusCode } from '../constants';

export const ListingRouter = new expessRouter.AsyncRouter({ mergeParams: true });

ListingRouter.post('/', [SchemaValidator.body(ListingRouteSchema.body), Auth.authenticateToken], async (req, res) => {
  const listing = await ListingRepo.create(req.user.id, req.body);
  res.status(StatusCode.CREATED).json(listing);
});

ListingRouter.patch('/:id', [SchemaValidator.body(ListingRouteUpdateSchema.body), Auth.authenticateToken], async (req, res) => {
  const updatedListing = await ListingRepo.update(req.user.id, req.body, req.params.id);
  updatedListing ? res.status(StatusCode.CREATED).json(updatedListing) : res.status(StatusCode.NOT_FOUND).send('Item not found!');
});

ListingRouter.get('/', [SchemaValidator.query(ListingRouteSchema.query), Auth.authenticateToken], async (req, res) => {
  const listings = await ListingRepo.filter(req.user.id);
  if (!listings) return res.status(StatusCode.NOT_FOUND).send('No Items found!');
  res.status(StatusCode.OK).json(listings);
});

ListingRouter.get('/:id', [SchemaValidator.params(ListingRouteSchema.params), Auth.authenticateToken], async (req, res) => {
  const listing = await ListingRepo.get(req.user.id, req.params.id);
  if (!listing) return res.status(StatusCode.NOT_FOUND).send('Item not found!');
  res.status(StatusCode.OK).json(listing);
});

ListingRouter.delete('/:id', [Auth.authenticateToken], async (req, res) => {
  const deletedListing = await ListingRepo.delete(req.user.id, req.params.id);
  if (!deletedListing) return res.status(StatusCode.NOT_FOUND).send('Item not found!');
  res.status(StatusCode.OK).json(deletedListing);
});
