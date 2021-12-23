const Router = require('express-promise-router');

const authRouter = require('./auth');
const companiesRouter = require('./companies');
const listingsRouter = require('./listings');
const usersRouter = require('./users');
const docsRouter = require('./api-docs');

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/api-docs', docsRouter);
router.use('/listings', listingsRouter);
router.use('/companies', companiesRouter);

module.exports = router;
