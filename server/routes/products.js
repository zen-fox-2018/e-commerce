const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const {sendUploadToGCS, multer} = require('../helpers/uploadImage')

/*create for test*/
router.post('/product', ProductController.createTest)
/*create new product*/
router.post('/', multer.single('image'), sendUploadToGCS, ProductController.create)

/*find all products*/
router.get('/', ProductController.findAll)

/*find one product*/
router.get('/:id', ProductController.findOne)

/*edit product*/
router.put('/:id', ProductController.updateProduct)

/*delete product*/
router.delete('/:id', ProductController.deleteProduct)

module.exports = router