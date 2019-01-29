const router = require('express').Router()
const {create, getAll, update} = require('../controllers/transaction');
const {validateUsertoken} = require('../middlewares/middleware');

router.get('/' , validateUsertoken, getAll);
router.post('/', validateUsertoken, create);
router.put('/:id', validateUsertoken, update)

module.exports = router