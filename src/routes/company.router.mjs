import expressRouter from 'express-async-router';
import { SchemaValidator, Auth } from '../middlewares';
import { CompanyRouteSchema } from './schemas';
import { CompanyRepo } from '../dataAccess';
import { StatusCode } from '../constants';
import { CompanyUpdateRouteSchema, CompanyFilterRouteSchema } from './schemas';
export const CompanyRouter = new expressRouter.AsyncRouter({ mergeParams: true });

CompanyRouter.post('/', [SchemaValidator.body(CompanyRouteSchema.body), Auth.authenticateToken], async (req, res) => {
  const company = await CompanyRepo.create(req.user.id, req.body);
  res.status(StatusCode.CREATED).json(company);
});

CompanyRouter.patch('/:id', [SchemaValidator.body(CompanyUpdateRouteSchema.body), Auth.authenticateToken], async (req, res) => {
  const updatedCompany = await CompanyRepo.update(req.params.id, req.body);
  res.status(StatusCode.OK).json(updatedCompany);
});

CompanyRouter.get('/:id', [SchemaValidator.params(CompanyRouteSchema.params), Auth.authenticateToken], async (req, res) => {
  const company = await CompanyRepo.get(+req.params.id);
  if (!company) return res.status(StatusCode.NOT_FOUND).send('Item not found!');
  res.status(StatusCode.OK).json(company);
});

CompanyRouter.get('/', [SchemaValidator.query(CompanyFilterRouteSchema.query), Auth.authenticateToken], async (req, res) => {
  const data = await CompanyRepo.filter(req.user.id, req.query);
  res.status(StatusCode.OK).json(data);
});

CompanyRouter.delete('/:id', [SchemaValidator.params(CompanyRouteSchema.params), Auth.authenticateToken], async (req, res) => {
  const deleted = await CompanyRepo.delete(+req.params.id);
  res.status(StatusCode.OK).json(deleted);
});
