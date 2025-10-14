const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/empresas/:id/indicadores', dashboardController.getIndicadoresAgregados);
router.get('/empresas/:id/usuarios', dashboardController.getUsuariosPorEmpresa);

module.exports = router;