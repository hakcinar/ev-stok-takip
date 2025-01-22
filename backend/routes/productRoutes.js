const router = require('express').Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const upload = require('../config/cloudinary');

// Tüm product route'ları için auth gerekli
router.use(auth);  // Bütün route'lara uygulanır

// Bu route'lar auth kontrolünden geçmek zorunda
router.post('/', auth, upload.single('image'), productController.create);                // Ürün oluştur
router.get('/house/:houseId', productController.getByHouse); // Eve göre listele
router.delete('/:id', auth, productController.delete); // Ürün silme
router.put('/:id', auth, upload.single('image'), productController.update); // Ürün güncelleme

module.exports = router; 