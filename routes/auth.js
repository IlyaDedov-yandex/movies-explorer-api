const router = require('express').Router();

const { createUser, login, signout } = require('../controllers/auth');
const { signinValidation } = require('../middlewares/validate');
const { signupValidation } = require('../middlewares/validate');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, login);
router.get('/signout', signout);

module.exports = router;
