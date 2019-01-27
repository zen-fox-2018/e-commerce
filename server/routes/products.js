const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const middleware = require('../middlewares/middleware');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});

router.get('/', productController.find);
router.post('/', middleware.auth, upload.single('image'), middleware.googleStorage, productController.create);
router.put('/:id', middleware.auth, productController.update);
router.delete('/:id', middleware.auth, productController.remove);

module.exports = router;