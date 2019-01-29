const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const middleware = require('../middlewares/middleware');

router.get('/', middleware.auth, cartController.read);
router.post('/', middleware.auth, cartController.create);
router.put('/product/:id', middleware.auth, cartController.addProd);
router.put('/total/:id', middleware.auth, cartController.addTotal);
router.put('/:id/product/:product', middleware.auth, cartController.remove);
router.delete('/:id', middleware.auth, cartController.checkout);

module.exports = router;