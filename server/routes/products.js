var express = require('express');
var router = express.Router();
var productController = require(`../controllers/productController`)
var m = require(`../middlewares/middlewares`)

router.use(m.checkToken)
router.post(`/`, productController.create)
router.get(`/`, productController.findAll)
router.get(`/:id`, productController.findOne)
router.put(`/:id`, productController.update)
router.delete(`/:id`, productController.delete)

module.exports = router