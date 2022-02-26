const Router = require('express-promise-router');

const authRouter = require('./auth');
const usersRouter = require('./users');
const docsRouter = require('./api-docs');
const listingsRouter = require('./listings');
const companiesRouter = require('./companies');
const rolesRouter = require('./roles');
const propertyTypesRouter = require('./property-types');
const listingTypesRouter = require('./listing-types');
const featuresRouter = require('./features');
const schedule = require('./schedule');
const socialStatisticsRouter = require('./social-statistics');

const router = Router();

router.use('/api-docs', docsRouter);
router.use('/api/auth', authRouter);
router.use('/api/users', usersRouter);
router.use('/api/listings', listingsRouter);
router.use('/api/companies', companiesRouter);
router.use('/api/roles', rolesRouter);
router.use('/api/property-types', propertyTypesRouter);
router.use('/api/listing-types', listingTypesRouter);
router.use('/api/features', featuresRouter);
router.use('/api/schedule', schedule);
router.use('/api/social-statistics', socialStatisticsRouter);

module.exports = router;
