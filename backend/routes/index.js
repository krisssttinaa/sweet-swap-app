const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 

router.use('/users', require('./userRoutes'));
router.use('/reports', require('./reportRoutes'));
router.use('/recipes', require('./recipeRoutes'));
router.use('/products', require('./productRoutes'));
router.use('/messages', require('./messageRoutes'));
router.use('/comments', require('./commentRoutes'));
router.use('/achievements', require('./achievementRoutes'));

module.exports = router;