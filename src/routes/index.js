const Router = require('express-promise-router');

const authRouter = require('./auth');
const usersRouter = require('./users');
const docsRouter = require('./api-docs');
const listingsRouter = require('./listings');
const companiesRouter = require('./companies');

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/api-docs', docsRouter);
router.use('/listings', listingsRouter);
router.use('/companies', companiesRouter);

module.exports = router;
