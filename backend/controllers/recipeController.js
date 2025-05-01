const Recipe = require('../models/recipe');
const fs = require('fs');
const db = require('../config/db');

exports.createRecipe = async (req, res) => {
  const { user_id, title, instructions, date_created } = req.body;
  const image = req.file ? fs.readFileSync(req.file.path) : null;

  try {
    const recipeId = await Recipe.createRecipe({
      user_id,
      title,
      instructions,
      date_created,
      image
    });
    res.status(201).json({ message: 'Recipe created', recipeId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.getAllRecipes();
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });  
  }
};

exports.getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    const [recipe] = await db.query('SELECT * FROM Recipe WHERE recipe_id = ?', [id]);
    if (!recipe.length) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const [products] = await db.query(`
      SELECT Product.*, RecipeProduct.quantity 
      FROM RecipeProduct 
      JOIN Product ON RecipeProduct.product_id = Product.product_id 
      WHERE RecipeProduct.recipe_id = ?`, [id]);

    recipe[0].products = products;
    res.json(recipe[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    await Recipe.deleteRecipe(id);
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getNewestRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.getLatestRecipes();
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching newest recipes:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getRecipesByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const [recipes] = await db.query('SELECT * FROM Recipe WHERE category = ?', [category]);
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};