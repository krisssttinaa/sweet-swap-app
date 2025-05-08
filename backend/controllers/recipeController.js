const Recipe = require('../models/recipe');
const fs = require('fs');
const db = require('../config/db');

exports.createRecipe = async (req, res) => {
  const { user_id, title, instructions, category, date_created = new Date() } = req.body;
  const imageFilename = req.file ? req.file.filename : null;

  if (!user_id || !title || !instructions) {
    return res.status(400).json({ error: 'Required fields missing' });
  }

  try {
    const recipeId = await Recipe.createRecipe({
      user_id,
      title,
      instructions,
      category,
      date_created,
      image_filename: imageFilename 
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

exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, instructions, category } = req.body;
  const imageFilename = req.file ? req.file.filename : null; // Get the new image file, if uploaded

  try {
    const [recipe] = await db.query('SELECT * FROM Recipe WHERE recipe_id = ?', [id]);

    if (!recipe.length) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const updatedRecipe = {
      title,
      instructions,
      category,
      image_filename: imageFilename || recipe[0].image_filename, // Use the new image or keep the old one
    };

    await db.query(
      'UPDATE Recipe SET title = ?, instructions = ?, category = ?, image_filename = ? WHERE recipe_id = ?',
      [updatedRecipe.title, updatedRecipe.instructions, updatedRecipe.category, updatedRecipe.image_filename, id]
    );

    res.json({ message: 'Recipe updated successfully' });
  } catch (err) {
    console.error('Error updating recipe:', err.message);
    res.status(500).send('Server error');
  }
};