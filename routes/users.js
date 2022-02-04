const router = require('express').Router();
const { getUserInfo, updateUser } = require('../controllers/users');
const { userValidation } = require('../middlewares/validate');

router.get('/me', getUserInfo);
router.patch('/me', userValidation, updateUser);

module.exports = router;
