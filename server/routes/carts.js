const express = require('express')
const router = express.Router()
const CartController = require('../controllers/CartController')
const { isLogin } = require('../middlewares')

router.use(isLogin)

/*add to carts*/
router.post('/:productId', CartController.addToCarts)

/*remove item from cart*/
router.put('/:productId', CartController.removeItemFromCart)

/*cart list*/
router.get('/', CartController.findCart)

/*delete cart*/
router.delete('/', CartController.removeCart)


module.exports = router