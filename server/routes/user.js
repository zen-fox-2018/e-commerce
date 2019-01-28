var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
var verifyGAccessToken = require('../middleware/verifyGAccessToken');
var {verifyJWT} = require('../middleware/verifyJWT');

router.get('/find', verifyJWT, userController.findHistory);
router.put('/history/delivered', verifyJWT, userController.markDelivered);
router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.post('/admin', userController.adminSignIn);
router.post('/gsignin', verifyGAccessToken, userController.googleSignIn);
router.get('/', userController.findAll);
module.exports = router;
