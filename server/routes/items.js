const express = require('express');
const router = express.Router();
const { userAuthentication } = require('../middleware/middleware');
const itemController = require('../controllers/itemController');

router.get('/', itemController.getAllItem)
router.post('/', userAuthentication, itemController.createItem)
router.put('/:item_id', userAuthentication, itemController.updateItem)
router.delete('/:item_id', userAuthentication, itemController.deleteItem)


module.exports = router;
