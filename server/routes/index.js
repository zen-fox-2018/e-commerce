var express = require('express');
var router = express.Router();

const usersRouter = require('./users');
const productsRouter = require('./products');
const cartRouter = require('./carts');
const transactionRouter = require('./transactions');
const { isLogin } = require('../middlewares');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/', usersRouter);

router.use('/products', productsRouter);

router.use(isLogin);

router.use('/cart', cartRouter);

router.use('/transactions', transactionRouter);

router.use((req, res) => {
  res.status(400).json({
    message: 'Error End Point'
  })
})
module.exports = router;
