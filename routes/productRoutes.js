const router = require('express').Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/', productController.create);
router.get('/house/:houseId', productController.getByHouse);

module.exports = router; 