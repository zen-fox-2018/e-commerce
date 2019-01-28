const express = require('express')
const router = express.Router()
const controllerCart = require('../controllers/cart')
const {isLogin} = require('../middlewares/middleware')

//nanti tambahin middleware gabisa beli punya sendiri
router.use(isLogin)

router
      .get('/', controllerCart.showCart)
      .post('/', controllerCart.addCart)
      .put('/:cartId', controllerCart.deleteProductCart)
      .put('/:cartId/plus', controllerCart.increaseQuantity)
      .put('/:cartId/minus', controllerCart.decreaseQuantity)

module.exports = router