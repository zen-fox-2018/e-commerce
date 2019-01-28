var express = require('express');
var router = express.Router();
const controllerUser = require('../controllers/user')

router.get('/', function(req, res, next) {
  res.json({ title: 'Home' });
});

router
      .post('/register', controllerUser.register)
      .post('/login', controllerUser.login)

module.exports = router;
