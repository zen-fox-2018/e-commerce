var express = require('express');
var router = express.Router();
var userController = require(`../controllers/userController`)
var authController = require(`../controllers/authController`)
var m = require(`../middlewares/middlewares`)

router.post(`/`, userController.create)
router.post(`/login`, userController.login)

//CART
router.get(`/cart/:userId`, m.checkToken, userController.findOne)
router.post(`/cart/:userId`, m.checkToken, userController.updateCart)
router.delete(`/cart`, m.checkToken, userController.emptyCart)
router.patch(`/cart/:userId/:cartId`, m.checkToken, userController.updateQty)
router.delete(`/cart/:userId/:cartId`, m.checkToken, userController.deleteOneCart)
router.post(`/ongkir`, m.checkToken, userController.ongkir)

module.exports = router;