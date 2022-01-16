const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const logger = require('morgan');

const routes = require('routes');
const { corsOrigin } = require('config/config');
const errorHandler = require('middleware/error-handler');
const { NotFound } = require('lib/errors');

const app = express();

app.set('showStackError', true);

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(cors({ origin: corsOrigin }));

app.use('/api', routes);

app.use('*', (req, res, next) => {
  throw new NotFound();
});

app.use(errorHandler);

module.exports = app;
