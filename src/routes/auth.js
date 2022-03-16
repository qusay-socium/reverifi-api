const Router = require('express-promise-router');

const { login, signup, googleLogin, facebookLogin } = require('controllers/auth');

const router = Router({ mergeParams: true });

/**
 * Handle POST to /api/login route.
 */
router.post('/login', login);

/**
 * Handle POST to /api/signup route.
 */
router.post('/signup', signup);

/**
 * Handle POST to /api/auth/google-login route.
 */
router.post('/google-login', googleLogin);

/**
 * Handle POST to /api/auth/facebook-login route.
 */
router.post('/facebook-login', facebookLogin);

module.exports = router;
