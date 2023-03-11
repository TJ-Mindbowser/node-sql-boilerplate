let router = require('express').Router();
const { login, signup, forgetPassword } = require('../controller/Auth')
const { updatePassword } = require('../controller/Auth');
const { isVerified } = require('../middleware/auth');

router.post('/login', login)
router.post('/update-password', isVerified, updatePassword)
router.post('/signup', signup)
router.post('/forget-password', forgetPassword)

module.exports = router