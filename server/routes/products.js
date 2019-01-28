var express = require('express');
var router = express.Router();
const { ProductController } = require('../controllers');
const { image } = require('../helpers')
/* GET users listing. */
router.get('/', ProductController.getAll);
router.post('/', image.multer.single('image'), image.sendUploadToGCS, ProductController.create);
router.delete('/:id', ProductController.delete);
router.put('/:id', ProductController.update);
router.get('/:id', ProductController.getOne);

module.exports = router;
