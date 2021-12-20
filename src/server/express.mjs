import express from 'express';
import expressRequestId from 'express-request-id';
import cors from 'cors';
import helmet from 'helmet';
import morganLogger from '../logger/morganLogger';
import appInfo from './../../package.json';
import { AuthRouter, CompanyRouter, UserInfoRouter, ListingRouter } from './../routes';

Logger.info('app::initExpress', 'express app init');
export const app = express();
app.set('showStackError', true);

Logger.info('app::initExpress', 'express app init middleware');
app.use(express.json());
app.use(expressRequestId());
app.use(morganLogger(true));
app.use(morganLogger());
app.use(cors({ origin: AppConfigs.cors.origin }));
app.use(helmet());

Logger.info('app::initExpress', 'express app init routes');
app.get('/auth-service/healthcheck', (req, res) => res.json({ name: appInfo.name, version: appInfo.version }));

app.use('/api/v2/auth/', AuthRouter);
app.use('/api/v2/company/', CompanyRouter);
app.use('/api/v2/user/', UserInfoRouter);
app.use('/api/v2/listing/', ListingRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  Logger.error(err);
  res.status(500).json({ messge: err.message, stack: err.stack });
});
