const express = require('express')
const router = express.Router()
const controllerProduct = require('../controllers/product.js')
const {isLogin, isOwner} = require('../middlewares/middleware')
const {sendUploadToGCS,multer} = require('../middlewares/upload.js')

router
      .get('/', controllerProduct.getAll)
      .get('/search', controllerProduct.search)
      .get('/top', controllerProduct.getTop)
      .get('/:productId', controllerProduct.getOne)
router
      .use(isLogin)
      .post('/', multer.single('file'), sendUploadToGCS, controllerProduct.create)
      .put('/:productId', isOwner, multer.single('file'), sendUploadToGCS, controllerProduct.edit)
      .delete('/:productId', isOwner, controllerProduct.deleted)

module.exports = router