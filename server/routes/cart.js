var express = require('express');
var router = express.Router();
const Controller = require('../controllers/CartController')
const { checkUser, checkIdCart } = require('../middlewares')

router.post('/', checkUser, Controller.create)
router.get('/:userId', Controller.getMyCart)
router.put('/:id', checkUser, checkIdCart, Controller.update)
router.delete('/', checkUser, Controller.deleteAll)
router.delete('/:id', checkUser, checkIdCart, Controller.deleteOne)
module.exports = router;
