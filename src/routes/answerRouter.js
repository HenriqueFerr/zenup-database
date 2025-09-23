const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');

router.post('/answer', answerController.createResposta);

module.exports = router;