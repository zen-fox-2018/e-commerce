var express = require('express');
var router = express.Router();
var userController = require('../controllers/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/check', userController.checkEmail)

module.exports = router;
