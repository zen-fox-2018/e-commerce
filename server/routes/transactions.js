const express = require('express')
const router = express.Router()
const TransactionController = require('../controllers/TransactionController')
const { isLogin, isAdmin } = require('../middlewares')

router.use(isLogin)

/*create new transaction*/
router.post('/', TransactionController.create)

/*confirm status shipping*/
router.put('/:id', TransactionController.confirmed)

/*find all transactions user login*/
router.get('/', TransactionController.findAllTransactionCheckout)

/*admin page find all transactions confirmed*/
router.get('/admin', isAdmin, TransactionController.findAllTransactionConfirmed)

/*get all my transactions*/
router.get('/mine/lists', TransactionController.findAllMyTransaction)


module.exports = router