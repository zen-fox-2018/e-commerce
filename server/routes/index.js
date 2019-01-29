var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router;
