var express = require('express');
var router = express.Router();
var userRoute = require(`./users`)
var productRouter = require(`./products`)
var transactionRouter = require(`./transaction`)

var mw = require(`../middlewares/middlewares`)

/* GET home page. */
router.use(`/users`, userRoute)
router.use(`/products`, mw.checkToken, productRouter)

module.exports = router;
