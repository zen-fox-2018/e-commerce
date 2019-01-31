var express = require('express');
var router = express.Router();
var productRouter = require('./product')
var userRouter = require('./users')
var cartRouter = require('./cart')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/cart', cartRouter)

module.exports = router;
