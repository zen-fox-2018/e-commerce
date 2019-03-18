var express = require('express');
var router = express.Router();
const TestiController = require('../controllers/TestiController')

router.get('/', TestiController.getTestis)

router.post('/', TestiController.createTesti)

router.get('/:testiId', TestiController.getTesti)

router.delete('/:testiId', TestiController.deleteTesti)


module.exports = router;