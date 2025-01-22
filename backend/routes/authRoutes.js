const router = require('express').Router();
const authController = require('../controllers/authController');

// /api/auth prefix'i altında
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router; 