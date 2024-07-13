const express = require('express');
const router = express.Router();
const { validateUser, validateUserUpdate, validate } = require('../middlewares/userValidate');
const userController = require('../controllers/userController');

// Routes for users
router.get('/users', userController.getAllUsers);

router.get('/users/:id', userController.getSingleUser);

router.post('/users', validateUser, userController.createUser);

router.put('/users/:id', validateUserUpdate, validate, userController.updateUser);

router.delete('/users/:id', userController.deleteUser);

module.exports = router;
