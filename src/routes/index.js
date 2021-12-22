const Router = require('./router');
const authRouter = require('./user');
const companyRouter = require('./company');
const listingRouter = require('./listing');
const userInfoRouter = require('./user-info');

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userInfoRouter);
router.use('/company', companyRouter);
router.use('/listing', listingRouter);

module.exports = router;
