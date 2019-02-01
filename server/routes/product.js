var express = require('express');
var router = express.Router();
const Controller = require('../controllers/ProductController')
const { checkIdProduct, checkUser } = require('../middlewares')
const images = require('../helpers/image')

router.get('/', Controller.findAll)
router.get('/me/:id', Controller.findMy)
router.post('/', checkUser, images.multer.single('image'),  images.sendUploadToGCS, Controller.create)
router.get('/:id', Controller.findOne)
router.put('/:id', checkUser, checkIdProduct, images.multer.single('image'),  images.sendUploadToGCS, Controller.update)
router.delete('/:id', checkUser, checkIdProduct, Controller.delete)

module.exports = router;
