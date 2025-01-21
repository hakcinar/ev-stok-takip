const router = require('express').Router();
const houseController = require('../controllers/houseController');
const auth = require('../middleware/auth');

// Tüm route'lar auth middleware'i kullanacak
router.use(auth);

router.post('/', houseController.create);
router.get('/my', houseController.getMyHouses);
router.post('/member', houseController.addMember);

module.exports = router; 