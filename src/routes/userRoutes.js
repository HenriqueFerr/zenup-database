const express = req('express');
const router = express.Router();
const userController = req('../controllers/userController');


router.post('/usuarios', userController.createUser);

module.exports= router;