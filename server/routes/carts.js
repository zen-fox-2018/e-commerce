var express = require('express');
var router = express.Router()
var cartController = require('../controllers/cart')
var {Authentications} = require('../middlewares/index')

router.post('/', Authentications, cartController.create)
router.get('/', Authentications, cartController.findByUser)
router.delete('/:id', Authentications, cartController.delete)

module.exports = router;