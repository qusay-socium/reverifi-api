const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const logger = require('morgan');
const routes = require('./routes');
const { appConfig } = require('./config/config');
const { NotFound } = require('./middleware/error-handler');

const app = express();

app.set('showStackError', true);

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(cors({ origin: appConfig.cors.origin }));
app.use('/api/v1', routes);

app.use('*', (req, res, next) => {
  throw new NotFound();
});

module.exports = {
  start: port => {
    if (port) {
      app.listen(port, () => {
        console.log('Heard From', port);
      });
    } else {
      console.log('Missing port.');
    }
  },
  app,
};
