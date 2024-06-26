const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deactivateUser);
router.post('/login', userController.loginUser);

module.exports = router;
