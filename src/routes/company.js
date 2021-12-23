const Router = require('express-promise-router');

const {
  deleteCompany,
  postCompany,
  patchCompany,
  getCompany,
  getCompanies,
} = require('../controller/company');
const auth = require('../middleware/auth');

const router = Router({ mergeParams: true });

router.get('/', auth, getCompanies);
router.post('/', auth, postCompany);

router.get('/:id', auth, getCompany);
router.patch('/:id', auth, patchCompany);
router.delete('/:id', auth, deleteCompany);

module.exports = router;
