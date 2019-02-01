const express = require('express');
const router = express.Router();
const { userAuthentication, isAdmin } = require('../middleware/middleware');
const transactionController = require('../controllers/transactionController');

router.get('/', userAuthentication, isAdmin, transactionController.getAllTransactions);
router.get('/me', userAuthentication, transactionController.getMyTransactions);
router.post('/', userAuthentication, transactionController.createTransaction);
router.put('/done/:transaction_id', userAuthentication, transactionController.successTransaction);

module.exports = router;