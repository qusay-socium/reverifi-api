const Router = require('express-promise-router');

const { login, signup } = require('controllers/auth');

const router = Router({ mergeParams: true });

/**
 * Handle POST to /api/login route.
 */
router.post('/login', login);

/**
 * Handle POST to /api/signup route.
 */
router.post('/signup', signup);

module.exports = router;
