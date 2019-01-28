var express = require('express');
var router = express.Router()
var tagController = require('../controllers/tag')
var {Authentications, AdminAuthentication} = require('../middlewares/index')

router.post('/', Authentications, AdminAuthentication, tagController.create)
router.get('/', tagController.findAll)
router.get('/:id', tagController.findOne)
router.put('/:id', tagController.update)
router.delete('/:id', tagController.delete)

module.exports = router;