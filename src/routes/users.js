const Router = require('express-promise-router');

const auth = require('middleware/auth');
const {
  createUserInfo,
  updateUserInfo,
  deleteUserInfo,
  getUserInfo,
  updateUserRoles,
  getUserRoles,
  getAgentUsersByType,
  getUsersWithLimit,
  addInvitedUser,
} = require('controllers/user');

const router = Router({ mergeParams: true });

/**
 * Handle GET to /api/users/agents/:type route.
 */
router.get('/agents/:type', getAgentUsersByType);

/**
 * Handle GET to /api/users/all/:limit route.
 */
router.get('/all/:limit', auth, getUsersWithLimit);

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
router.get('/', auth, getUserInfo);

/**
 * Handle GET to /api/users/:id route.
 */
router.get('/:id', getUserInfo);

/**
 * Handle POST to /api/users/invited route.
 */
router.post('/invited', auth, addInvitedUser);

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
