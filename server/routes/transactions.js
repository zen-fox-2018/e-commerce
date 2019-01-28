var express = require('express');
var router = express.Router();
const TransactionController = require('../controllers/TransactionController')

router.get('/', TransactionController.getTransactions)

router.get('/buyer/:buyerId', TransactionController.getTransactionsByBuyer)

router.post('/', TransactionController.createTransaction)

router.get('/:transactionId', TransactionController.getTransaction)

router.delete('/:transactionId', TransactionController.deleteTransaction)


module.exports = router;