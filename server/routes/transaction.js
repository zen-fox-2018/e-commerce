const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/middleware');
const transactionController = require('../controllers/transactionController');

router.get('/', middleware.auth, middleware.admin, transactionController.read);
router.get('/me', middleware.auth, transactionController.readOne);
router.put('/:id', middleware.auth, transactionController.update);

module.exports = router;