const express = require('express');
const router = express.Router();
const { TransactionController } = require('../controllers');
const { isAdmin } = require('../middlewares')
router.get('/', isAdmin, TransactionController.getAll);
router.get('/mine', TransactionController.getMine);
router.put('/:id', TransactionController.updateStatus);

module.exports = router;
