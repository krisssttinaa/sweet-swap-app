const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const auth = require('../middleware/auth');
const upload = require('../middleware/uploadMiddleware');
const db = require('../config/db');

router.post('/create', auth, upload.single('image'), recipeController.createRecipe);
router.get('/', recipeController.getAllRecipes);
router.get('/newest', recipeController.getNewestRecipes);
router.get('/category/:category', recipeController.getRecipesByCategory);

router.get('/search', async (req, res) => { // Place search route before the ID route
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const [recipes] = await db.query(
            "SELECT * FROM Recipe WHERE title LIKE ? OR instructions LIKE ?",
            [`%${query}%`, `%${query}%`]
        );

        if (recipes.length > 0) {
            res.json(recipes);
        } else {
            res.status(404).json({ error: 'No recipes found matching your query' });
        }
    } catch (err) {
        console.error('Error fetching search results:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:id', recipeController.getRecipeById);
router.put('/:id', auth, upload.single('image'), recipeController.updateRecipe);
router.delete('/:id', auth, recipeController.deleteRecipe);

module.exports = router;