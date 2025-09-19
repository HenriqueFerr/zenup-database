const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/empresas/:id/indicadores', authMiddleware.protect, dashboardController.getIndicadoresAgregados);
router.get('/empresas/:id/usuarios', authMiddleware.protect, dashboardController.getUsuariosPorEmpresa); // Nova rota GET

module.exports = router;