const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item');
const multer  = require('../middleware/multer');
const gcpupload = require('../middleware/GCPupload');
// router.post('/', itemController.create)           //  C                       
router.post('/', multer.array('productimage',2), gcpupload, itemController.create)           //  C                       
router.get('/all', itemController.getAll)         //  R
router.get('/:itemId', itemController.findOne)         //  R
router.put('/:id', itemController.update)            //  U 
router.delete('/:id', itemController.deleteOne)   //  D     

module.exports =router
