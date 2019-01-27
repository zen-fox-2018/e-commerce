const express = require('express');
const router = express.Router();
const {getAll, create, update, remove} = require('../controllers/product');
const {validateUsertoken, authorization} = require('../middlewares/middleware');
const { googleStorage } = require('../middlewares/uploadGcs');
var multer  = require('multer')
const storage = multer.memoryStorage()
let upload = multer({storage: storage})

router.get('/', validateUsertoken, getAll);
router.post('/', validateUsertoken, upload.single('image'), googleStorage, create);
router.put('/:id', validateUsertoken, authorization, update);
router.delete('/:id', validateUsertoken, authorization, remove);

module.exports = router;