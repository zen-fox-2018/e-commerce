const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkPassword } = require('../middleware/middleware');

router.post('/signin', checkPassword, userController.signIn)
router.post('/signup', userController.signUp)

module.exports = router;
