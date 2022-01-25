const Router = require('express-promise-router');

const authRouter = require('./auth');
const usersRouter = require('./users');
const docsRouter = require('./api-docs');
const listingsRouter = require('./listings');
const companiesRouter = require('./companies');
const rolesRouter = require('./roles');
const propertyType = require('./property-type');
const listingType = require('./listing-type');
const features = require('./features');

const router = Router();

router.use('/api-docs', docsRouter);
router.use('/api/auth', authRouter);
router.use('/api/users', usersRouter);
router.use('/api/listings', listingsRouter);
router.use('/api/companies', companiesRouter);
router.use('/api/roles', rolesRouter);
router.use('/api/property-types', propertyType);
router.use('/api/listing-types', listingType);
router.use('/api/features', features);

module.exports = router;
