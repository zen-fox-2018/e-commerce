var express = require('express');
var router = express.Router();
const { CartController } = require('../controllers')
const { checkProduct } = require('../middlewares');

router.put('/add', checkProduct, CartController.addToCart);
router.put('/minus', checkProduct, CartController.decrementQuantity);
router.put('/remove', checkProduct, CartController.removeFromCart);
router.get('/', CartController.getCart);
router.put('/checkout', CartController.checkout);

module.exports = router;