const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



// CREATE
router.post('/usuarios', userController.createUser);
//READ ALL
router.get('/usuarios', userController.getAllUsers);
// READ BY ID
// router.get('/usuarios/:id', userController.getUserById);
// UPDATE
router.put('/usuarios/:id', userController.updateUser);
// DELETE
router.delete('/usuarios/:id', userController.deleteUser);


module.exports= router;