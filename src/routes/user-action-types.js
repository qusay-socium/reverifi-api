const Router = require('express-promise-router');

const auth = require('middleware/auth');
const {
  createUserActionType,
  getAllUserActionTypes,
  getUserActionTypesByUserId,
} = require('controllers/user-action-types');

const router = Router({ mergeParams: true });

/**
 * Handle POST to /api/action-types route.
 */
router.post('/', auth, createUserActionType);

/**
 * Handle GET to /api/action-types route.
 */
router.get('/', auth, getAllUserActionTypes);

/**
 * Handle GET to /api/action-types route.
 */
router.get('/:id', auth, getUserActionTypesByUserId);

module.exports = router;
