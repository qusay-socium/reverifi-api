const Router = require('express-promise-router');

const validateRequest = require('middleware/validate-request');
const {
  login,
  signup,
  googleLogin,
  facebookLogin,
  sendResetPasswordValidator,
  sendResetPasswordLink,
  resetPasswordValidator,
  resetUserPassword,
} = require('controllers/auth');

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

/**
 * Handle POST to /api/auth//:userId/:token route.
 */
router.post('/reset-password/:token', resetPasswordValidator, validateRequest, resetUserPassword);

/**
 * Handle POST to /api/auth/reset-password route.
 */
router.post('/reset-password', sendResetPasswordValidator, validateRequest, sendResetPasswordLink);

module.exports = router;
