var express = require('express');
var router = express.Router();
var transactionController = require(`../controllers/transactionController`)
var m = require(`../middlewares/middlewares`)

router.post(`/`, m.checkToken, transactionController.create)

module.exports = router