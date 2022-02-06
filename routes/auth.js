const router = require('express').Router();

const { createUser, login } = require('../controllers/auth');
const { signinValidation } = require('../middlewares/validate');
const { signupValidation } = require('../middlewares/validate');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, login);

module.exports = router;
