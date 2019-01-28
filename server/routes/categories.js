var express = require('express');
var router = express.Router();
const controllerCategory = require('../controllers/category.js')
const {isLogin} = require('../middlewares/middleware.js')

router
      .get('/', controllerCategory.showCategories)
router.use(isLogin)
router
      .post('/', controllerCategory.addCategory)
      .put('/:id', controllerCategory.editCategory)
      .delete('/:id', controllerCategory.deleteCategory)

module.exports = router;
