var express = require('express');
var router = express.Router();
const CartController = require('../controllers/CartController')

router.post('/', CartController.createCart)

router.get('/:cartId', CartController.getCart)

router.get('/buyer/:buyerId', CartController.getCarts)

router.delete('/:cartId', CartController.deleteCart)

router.delete('/user/:userId', CartController.deleteAllCart)


module.exports = router;