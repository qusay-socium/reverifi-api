const Router = require('express-promise-router');

const auth = require('middleware/auth');
const {
  postUserInfo,
  patchUserInfo,
  getUserInfo,
  getUsersInfo,
  deleteUserInfo,
} = require('controllers/user');

const router = Router({ mergeParams: true });

/**
 * User routes.
 */
router.get('/', auth, getUsersInfo);
router.post('/', auth, postUserInfo);
router.patch('/', auth, patchUserInfo);
router.delete('/', auth, deleteUserInfo);

router.get('/:id', auth, getUserInfo);

module.exports = router;
