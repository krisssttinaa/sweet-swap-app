const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const auth = require('../middleware/auth');

router.get('/', auth, recipeController.getAllRecipes);
router.get('/:id', auth, recipeController.getRecipeById);
router.post('/', auth, recipeController.createRecipe);
router.delete('/:id', auth, recipeController.deleteRecipe);

module.exports = router;