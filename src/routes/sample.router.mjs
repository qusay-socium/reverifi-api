import expressRouter from 'express-async-router';
import { schemaValidator } from '../middlewares';
import { SampleRouteSchema } from './schemas';
import { SampleRepo } from '../dataAccess';

export const SampleRouter = new expressRouter.AsyncRouter({ mergeParams: true });

SampleRouter.post('/', schemaValidator.body(SampleRouteSchema.body), async (req, res) => {
  const created = await SampleRepo.create(req.body.name, undefined /* replace with user from auth */, req.id);
  res.status(201).json(created);
});
