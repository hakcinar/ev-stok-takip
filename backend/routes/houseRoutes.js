const router = require('express').Router();
const houseController = require('../controllers/houseController');
const auth = require('../middleware/auth');

// Tüm house route'ları için auth gerekli
router.use(auth);

// /api/houses prefix'i altında
router.post('/', houseController.create);           // Ev oluşturma
router.get('/my', houseController.getMyHouses);     // Evlerimi listele
router.post('/member', houseController.addMember);  // Üye ekleme

module.exports = router; 