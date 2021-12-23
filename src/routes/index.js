const Router = require('express-promise-router');

const authRouter = require('./auth');
const companiesRouter = require('./companies');
const listingsRouter = require('./listings');
const usersRouter = require('./users');

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/companies', companiesRouter);
router.use('/listings', listingsRouter);

module.exports = router;
