var express = require('express');
var router = express.Router();
const cart = require('../controllers/cart')
const { checkLogin, checkProduct } = require('../middlewares')

router.use(checkLogin)
router.get('/', cart.getProduct)
router.put('/updateProduct', checkProduct, cart.updateProduct)
router.put('/addProduct', checkProduct, cart.addProduct)
router.put('/removeProduct', checkProduct, cart.removeProduct)
router.put('/checkout', cart.checkoutCart)

module.exports = router;
