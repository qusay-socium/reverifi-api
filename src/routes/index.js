const Router = require('express-promise-router');

const authRouter = require('./auth');
const usersRouter = require('./users');
const docsRouter = require('./api-docs');
const listingsRouter = require('./listings');
const companiesRouter = require('./companies');

const router = Router();

router.use('/api-docs', docsRouter);
router.use('/api/auth', authRouter);
router.use('/api/users', usersRouter);
router.use('/api/listings', listingsRouter);
router.use('/api/companies', companiesRouter);

module.exports = router;
