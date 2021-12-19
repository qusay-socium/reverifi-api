import expressRouter from 'express-async-router';
import { SchemaValidator, Auth } from '../middlewares';
import { UserInfoRouteSchema, UserInfoUpdateRouteSchema } from './schemas';
import { UserInfoRepo } from '../dataAccess';
import { StatusCode } from '../constants';
export const UserInfoRouter = new expressRouter.AsyncRouter({ mergeParams: true });

UserInfoRouter.post('/', [SchemaValidator.body(UserInfoRouteSchema.body), Auth.authenticateToken], async (req, res) => {
  const userInfo = await UserInfoRepo.create(req.user.id, req.body);
  res.status(StatusCode.CREATED).json(userInfo);
});

UserInfoRouter.patch('/', [SchemaValidator.body(UserInfoUpdateRouteSchema.body), Auth.authenticateToken], async (req, res) => {
  const updatedUserInfo = await UserInfoRepo.update(req.user.id, req.body);
  res.status(StatusCode.OK).json(updatedUserInfo);
});

UserInfoRouter.get('/', [Auth.authenticateToken], async (req, res) => {
  const company = await UserInfoRepo.get(req.user.id);
  if (!company) return res.status(StatusCode.NOT_FOUND).send('Item not found!');
  res.status(StatusCode.OK).json(company);
});

UserInfoRouter.get('/all', [SchemaValidator.query(UserInfoRouteSchema.query), Auth.authenticateToken], async (req, res) => {
  const data = await UserInfoRepo.filter(req.query);
  res.status(StatusCode.OK).json(data);
});

UserInfoRouter.delete('/', [Auth.authenticateToken], async (req, res) => {
  const deleted = await UserInfoRepo.delete(+req.user.id);
  res.status(StatusCode.OK).json(deleted);
});
