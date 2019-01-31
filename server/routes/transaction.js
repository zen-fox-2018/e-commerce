var express = require('express');
var router = express.Router();
const controllerTransaction = require('../controllers/transaction')
const {isLogin} = require('../middlewares/middleware')

router.use(isLogin)
router
      .get('/', controllerTransaction.getAllTransaction)
      .get('/me', controllerTransaction.getMyTransaction)
      .post('/', controllerTransaction.checkout)
      .put('/:transactionId', controllerTransaction.confirmTransaction)

module.exports = router;