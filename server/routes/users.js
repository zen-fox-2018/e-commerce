var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController')
const {sendUploadToGCS, multer} = require('../helpers/uploadImage')
const {isLogin} = require('../middlewares')

/*user register for test*/
router.post('/user', UserController.registerTest)

/*user register*/
router.post('/', multer.single('avatar'), sendUploadToGCS, UserController.register)

/*user login*/
router.post('/login', UserController.login)

router.use(isLogin)

/*find one user*/
router.get('/', UserController.findOne)

module.exports = router;
