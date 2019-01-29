var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.register);
router.post('/login', userController.login);

module.exports = router;
