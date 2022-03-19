const Router = require('express-promise-router');

const auth = require('middleware/auth');
const {
  createActionType,
  getActionTypes,
  updateActionType,
  deleteActionType,
  getActionTypeById,
} = require('controllers/action-types');

const router = Router({ mergeParams: true });

/**
 * Handle POST to /api/action-types route.
 */
router.post('/', auth, createActionType);

/**
 * Handle GET to /api/action-types route.
 */
router.get('/', auth, getActionTypes);

/**
 * Handle GET to /api/action-types route.
 */
router.get('/:id', auth, getActionTypeById);

/**
 * Handle PATCH to /api/action-types route.
 */
router.patch('/:id', auth, updateActionType);

/**
 * Handle DELETE to /api/action-types route.
 */
router.delete('/:id', auth, deleteActionType);

module.exports = router;
