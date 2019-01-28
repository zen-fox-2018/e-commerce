var express = require('express');
var router = express.Router()
var cartController = require('../controllers/cart')
var {} = require('../middlewares/index')

router.post('/', cartController.create)

module.exports = router;