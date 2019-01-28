var express = require('express');
var router = express.Router();
const user = require('../controllers/user')

router.post('/register', user.register)
router.post('/login', user.login)

module.exports = router;
