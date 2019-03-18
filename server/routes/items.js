var express = require('express');
var router = express.Router();
const images = require('../helpers/images')
const ItemController = require('../controllers/ItemController')

router.get('/', ItemController.getItems)

router.post('/', images.multer.single('image'), images.sendUploadToGCS, ItemController.createItem)

router.get('/:itemId', ItemController.getItem)

router.patch('/:itemId', ItemController.updateItem)

router.delete('/:itemId', ItemController.deleteItem)


module.exports = router;