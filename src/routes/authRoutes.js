const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota de login. Aceita requisições POST para a URL '/login'.
router.post('/login', authController.login);

module.exports = router;