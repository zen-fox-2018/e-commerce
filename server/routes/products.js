var express = require('express');
var router = express.Router();
const product = require('../controllers/product')
const { multer, sendUploadToGCS } = require('../middlewares/upload')

router.get('/', product.getAll)
router.get('/:id', product.getOne)
router.post('/', multer.single('file'), sendUploadToGCS, product.create)
router.put('/:id', multer.single('file'), sendUploadToGCS, product.update)
router.delete('/:id', product.delete)

module.exports = router;
