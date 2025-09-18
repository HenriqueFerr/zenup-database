const express = require('express');
const router = express.Router();
const respostasController = require('../controllers/respostasController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/respostas', authMiddleware.protect, respostasController.createResposta);

module.exports = router;