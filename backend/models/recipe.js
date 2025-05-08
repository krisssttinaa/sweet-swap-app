const conn = require('../config/db');
const Recipe = {};

Recipe.getAllRecipes = () => {
    return conn.query('SELECT * FROM Recipe')
        .then(([rows, fields]) => rows)
        .catch((err) => {
            console.error('Error fetching all recipes:', err);
            throw err;
        });
};

Recipe.getRecipeById = (id) => {
    return conn.query('SELECT * FROM Recipe WHERE recipe_id = ?', [id])
        .then(([rows, fields]) => rows)
        .catch((err) => {
            console.error(`Error fetching recipe with ID ${id}:`, err);
            throw err;
        });
};

Recipe.createRecipe = (recipeData) => {
    const { title, instructions, user_id, category, date_created, image_filename } = recipeData;
    return conn.query(
      'INSERT INTO Recipe (title, instructions, user_id, category, date_created, image_filename) VALUES (?, ?, ?, ?, ?, ?)',
      [title, instructions, user_id, category, date_created, image_filename]
    )
      .then(([result]) => result)
      .catch((err) => {
        console.error('Error creating recipe:', err);
        throw err;
      });
};

Recipe.updateRecipe = (id, updatedRecipeData) => {
    const { title, instructions, category, image_filename } = updatedRecipeData;
    return conn.query(
        'UPDATE Recipe SET title = ?, instructions = ?, category = ?, image_filename = ? WHERE recipe_id = ?',
        [title, instructions, category, image_filename, id]
    )
    .then(([result]) => result)
    .catch((err) => {
        console.error(`Error updating recipe with ID ${id}:`, err);
        throw err;
    });
};

Recipe.deleteRecipe = (id) => {
    return conn.query('DELETE FROM Recipe WHERE recipe_id = ?', [id])
        .then(([result]) => result)
        .catch((err) => {
            console.error(`Error deleting recipe with ID ${id}:`, err);
            throw err;
        });
};

Recipe.getLatestRecipes = () => {
    return conn.query('SELECT * FROM Recipe ORDER BY date_created DESC LIMIT 3')
      .then(([rows, fields]) => rows)
      .catch((err) => {
        console.error('Error fetching latest recipes:', err);
        throw err;
      });
};

module.exports = Recipe;