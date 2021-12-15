import expressRouter from 'express-async-router';
import { SchemaValidator } from '../middlewares';
import { AuthRouteSchemaLogin, AuthRouteSchemaSignUp } from './schemas';
import { AuthRepo } from '../dataAccess';
import { StatusCode } from '../constants';
export const AuthRouter = new expressRouter.AsyncRouter({ mergeParams: true });

AuthRouter.post('/login', SchemaValidator.body(AuthRouteSchemaLogin.body), async (req, res) => {
  const user = await AuthRepo.login(req.body);
  if (!user) return res.status(StatusCode.UNAUTHORIZED).send('Invalid credentials!');
  res.status(StatusCode.CREATED).json(user);
});

AuthRouter.post('/signup', SchemaValidator.body(AuthRouteSchemaSignUp.body), async (req, res) => {
  const user = await AuthRepo.signUp(req.body);
  if (!user) return res.send('Something went wrong!');
  return res.status(StatusCode.CREATED).json(user);
});
