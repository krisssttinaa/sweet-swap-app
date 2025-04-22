const Recipe = require('../models/recipe');

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.getAllRecipes();
        res.json(recipes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.getRecipeById(req.params.id);
        if (!recipe.length) {
            return res.status(404).json({ msg: 'Recipe not found' });
        }
        res.json(recipe[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createRecipe = async (req, res) => {
    const { user_id, title, product_id, instructions } = req.body;
    try {
        const newRecipe = await Recipe.createRecipe({
            user_id,
            title,
            product_id,
            instructions,
            date_created: new Date()
        });
        res.json(newRecipe);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        await Recipe.deleteRecipe(req.params.id);
        res.json({ msg: 'Recipe deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};