var express = require('express');
var router = express.Router();
const Controller = require('../controllers/UserController')
const { checkUser } = require('../middlewares')
const images = require('../helpers/image')

router.post('/', images.multer.single('image'),  images.sendUploadToGCS, Controller.create)
router.post('/login', Controller.login)
router.get('/:id', Controller.findOne)

module.exports = router;
