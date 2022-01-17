const Router = require('express-promise-router');

const auth = require('middleware/auth');
const {
  getAllUserInfo,
  createUserInfo,
  updateUserInfo,
  deleteUserInfo,
  getUserInfoById,
} = require('controllers/user');

const router = Router({ mergeParams: true });

/**
 * Handle GET to /api/users route.
 */
router.get('/', auth, getAllUserInfo);

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

/**
 * Handle GET to /api/users/:id route.
 */
router.get('/:id', auth, getUserInfoById);

module.exports = router;
