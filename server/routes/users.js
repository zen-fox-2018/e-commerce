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

/*rate product*/
router.post('/:productId', UserController.rateProduct)

/*wishlist product*/
router.put('/:productId', UserController.wishlistProduct)

/*delete wishlist*/
router.put('/remove/:productId', UserController.removeWishList)

module.exports = router;
