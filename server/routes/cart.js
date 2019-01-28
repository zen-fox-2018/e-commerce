const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const {verifyJWT} = require('../middleware/verifyJWT');

router.put('/', verifyJWT, cartController.updateCart)
router.get('/checkout', verifyJWT, cartController.checkout)
router.delete('/', verifyJWT, cartController.delete)
module.exports =router
