const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const SavedRecipe = require('../models/savedRecipe');

router.post('/save', auth, async (req, res) => {
    const { recipeId } = req.body;
    const userId = req.user.id;

    try {
        await SavedRecipe.create(userId, recipeId);
        res.status(200).send('Recipe saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving recipe');
    }
});

router.delete('/unsave', auth, async (req, res) => {
    const { recipeId } = req.body;
    const userId = req.user.id;

    try {
        await SavedRecipe.delete(userId, recipeId);
        res.status(200).send('Recipe unsaved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error unsaving recipe');
    }
});

router.get('/saved', auth, async (req, res) => {
    const userId = req.user.id;

    try {
        const savedRecipes = await SavedRecipe.findByUser(userId);
        res.status(200).json(savedRecipes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching saved recipes');
    }
});

module.exports = router;