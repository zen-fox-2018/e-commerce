var express = require('express');
var router = express.Router();
const {CartController} = require('../controllers')
const {checkProduct ,checkLogin} = require('../middlewares')

router.use(checkLogin)
router.put('/add',checkProduct, CartController.addCart)
router.put('/remove',checkProduct, CartController.removeCart)

module.exports = router;
