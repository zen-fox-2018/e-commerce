var express = require('express');
var router = express.Router();

const { getAllCart, createCart, addQty, reduceQty, emptyCart, removeCart } = require('../controllers/cartController')
const userAuth = require('../middlewares/userAuth')
// router.get('/', getAllCart)
router.post('/', userAuth, createCart)
router.get('/', userAuth, getAllCart)
router.delete('/', userAuth, emptyCart)
router.put('/add/:id', userAuth, addQty)
router.put('/remove/:id', userAuth,reduceQty)
router.delete('/:id', userAuth, removeCart)

module.exports = router;
