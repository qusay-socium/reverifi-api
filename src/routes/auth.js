const Router = require('express-promise-router');

const { login, signup } = require('controllers/auth');

const router = Router({ mergeParams: true });

/**
 * Auth routes.
 */
router.post('/login', login);
router.post('/signup', signup);

module.exports = router;
