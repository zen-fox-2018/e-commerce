var express = require('express')
var router = express.Router()
var {ProductController} = require('../controllers')

const upload = require('../middlewares/');

router.post('/',upload.multer.single('img'), upload.sendUploadToGCS , ProductController.create)
router.get('/', ProductController.getAll)
router.delete('/:_id', ProductController.delete)
router.put('/:_id', ProductController.update)

module.exports = router