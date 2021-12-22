const Router = require('./router');
const auth = require('../middleware/auth');

const router = Router({ mergeParams: true });
const { login, signup, putUser } = require('../controller/user');

/**
 * User routes.
 */
router.post('/login', login);
router.post('/signup', signup);
router.patch('/user', auth, putUser);

module.exports = router;
