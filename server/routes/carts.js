var express = require('express');
var router = express.Router();
var cart = require('../controllers/cartController')
const { isLogin } = require('../middlewares/isLogin')

router.post('/', isLogin, cart.createCart);
router.get('/:status', isLogin, cart.readCart);
router.put('/:id', isLogin, cart.updateCart);
router.put('/inc/:id', isLogin, cart.updateIncrement);
router.delete('/del/:id', isLogin, cart.deleteCartItem);
router.put('/checkout/:id', isLogin, cart.checkOut);
router.put('/arrived/:id', isLogin, cart.arrived);

module.exports = router;
