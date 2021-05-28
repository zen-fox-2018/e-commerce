var express = require('express');
var router = express.Router();
var product = require('../controllers/productController')

router.post('/', product.createProduct);
router.get('/', product.readProduct);
router.put('/:id', product.updateProduct);
router.delete('/:id',product.deleteProduct);

module.exports = router;
