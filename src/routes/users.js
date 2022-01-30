const Router = require('express-promise-router');

const auth = require('middleware/auth');
const {
  createUserInfo,
  updateUserInfo,
  deleteUserInfo,
  getUserInfoById,
  updateUserRoles,
  getUserRoles,
} = require('controllers/user');

const router = Router({ mergeParams: true });

/**
 * Handle GET to /api/users/roles route.
 */
router.get('/roles', auth, getUserRoles);

/**
 * Handle PATCH to /api/users/roles route.
 */
router.patch('/roles', auth, updateUserRoles);

/**
 * Handle GET to /api/users route.
 */
router.get('/', auth, getUserInfoById);

/**
 * Handle POST to /api/users route.
 */
router.post('/', auth, createUserInfo);

/**
 * Handle PATCH to /api/users route.
 */
router.patch('/', auth, updateUserInfo);

/**
 * Handle DELETE to /api/users route.
 */
router.delete('/', auth, deleteUserInfo);

module.exports = router;
