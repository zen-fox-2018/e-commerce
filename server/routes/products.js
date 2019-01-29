var express = require('express');
var router = express.Router()
var {Authentications, AdminAuthentication} = require('../middlewares/index')
var productController = require('../controllers/product')

router.get('/', productController.findAll)
router.get('/:id', productController.findOne)
router.post('/',Authentications, AdminAuthentication, productController.create)
router.put('/:id',Authentications, AdminAuthentication, productController.update)
router.delete('/:id',Authentications, AdminAuthentication, productController.delete)

module.exports = router;