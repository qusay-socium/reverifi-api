import '../dataAccess';
import { app } from './express';

try {
  app.listen(AppConfigs.port, err => {
    Logger.info('app::initExpress', `template service running on port ${AppConfigs.port}`);
    if (err) throw err;
  });
} catch (ex) {
  Logger.error('app::initExpress', ex.messge, undefined, ex);
  process.exit(-1);
}
