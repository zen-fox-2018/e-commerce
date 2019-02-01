const express = require('express');
const router = express.Router();
const { userAuthentication } = require('../middleware/middleware');
const itemController = require('../controllers/itemController');
const cartController = require('../controllers/cartController');

router.get('/', userAuthentication, cartController.getUserCart);
router.post('/', userAuthentication, cartController.createCart);
router.put('/remove_one_item/:item_id', userAuthentication, cartController.removeOne);
router.put('/remove_certain_item/:item_id', userAuthentication, cartController.removeAll);
router.delete('/:cart_id', userAuthentication, cartController.deleteCart);

module.exports = router;