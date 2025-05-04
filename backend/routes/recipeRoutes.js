const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const auth = require('../middleware/auth');
const upload = require('../middleware/uploadMiddleware');

router.post('/create', auth, upload.single('image'), recipeController.createRecipe);
router.get('/', recipeController.getAllRecipes);
router.get('/newest', recipeController.getNewestRecipes);
router.get('/:id', recipeController.getRecipeById);
router.delete('/:id', auth, recipeController.deleteRecipe);
router.get('/category/:category', recipeController.getRecipesByCategory);

module.exports = router;