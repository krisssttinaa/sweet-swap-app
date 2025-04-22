const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Ensure this path is correct

router.use('/users', require('./userRoutes'));
router.use('/reports', require('./reportRoutes'));
router.use('/recipes', require('./recipeRoutes'));
router.use('/products', require('./productRoutes'));
router.use('/posts', require('./postRoutes'));
router.use('/messages', require('./messageRoutes'));
router.use('/comments', require('./commentRoutes'));
router.use('/achievements', require('./achievementRoutes'));
router.use('/public', require('./publicRoutes'));// Public route for viewing posts

module.exports = router;