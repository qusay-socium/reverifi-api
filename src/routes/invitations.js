const Router = require('express-promise-router');

const auth = require('middleware/auth');
const { getInvitations, addInvitation, updateInvitation } = require('controllers/invitation');

const router = Router({ mergeParams: true });

/**
 * Handle GET to /api/invitations/:type route.
 */
router.get('/:type', auth, getInvitations);

/**
 * Handle POST to /api/invitations route.
 */
router.post('/', auth, addInvitation);

/**
 * Handle Patch to /api/invitations/:id route.
 */
router.patch('/:id', auth, updateInvitation);

module.exports = router;
