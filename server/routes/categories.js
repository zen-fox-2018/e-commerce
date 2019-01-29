var express = require('express');
var router = express.Router()
var categoryController = require('../controllers/category')
var {Authentications, AdminAuthentication} = require('../middlewares/index')

router.post('/', Authentications, AdminAuthentication, categoryController.create)
router.get('/', categoryController.findAll)
router.get('/:id', categoryController.findOne)
router.put('/:id', categoryController.update)
router.delete('/:id', categoryController.delete)

module.exports = router;