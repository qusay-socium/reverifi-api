const Router = require('./router');
const auth = require('../middleware/auth');
const { postUserInfo, patchUserInfo, getUserInfo, getUsersInfo, deleteUserInfo } = require('../controller/user-info');

const router = Router({ mergeParams: true });

router.get('/', auth, getUsersInfo);
router.post('/', auth, postUserInfo);
router.patch('/', auth, patchUserInfo);
router.delete('/', auth, deleteUserInfo);

router.get('/:id', auth, getUserInfo);

module.exports = router;
