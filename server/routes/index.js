var express = require('express');
var router = express.Router();
const userRouter = require('./users')
const productRouter = require('./products')
const cartRouter = require('./carts')

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/carts', cartRouter)

module.exports = router;
