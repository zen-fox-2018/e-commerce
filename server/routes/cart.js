const router = require('express').Router();
const {create, remove, getAll, updateCart} = require('../controllers/cart');
const {validateUsertoken, authorization, productCartUnique} = require('../middlewares/middleware');

router.get('/', validateUsertoken, getAll);
router.post('/', validateUsertoken, productCartUnique, create);
router.put('/:id', validateUsertoken, updateCart);
router.delete('/:id', validateUsertoken, remove);

module.exports = router;