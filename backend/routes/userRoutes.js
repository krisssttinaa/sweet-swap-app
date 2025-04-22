const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', auth, userController.profile); 
router.get('/all', userController.getAllUsers);
router.get('/:id', userController.getUserById);

module.exports = router;