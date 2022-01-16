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
 * Handle GET to /api/listings route.
 */
router.get('/', auth, getAllUserInfo);

/**
 * Handle POST to /api/listings route.
 */
router.post('/', auth, createUserInfo);

/**
 * Handle PATCH to /api/listings route.
 */
router.patch('/', auth, updateUserInfo);

/**
 * Handle DELETE to /api/listings route.
 */
router.delete('/', auth, deleteUserInfo);

/**
 * Handle GET to /api/listings/:id route.
 */
router.get('/:id', auth, getUserInfoById);

module.exports = router;
