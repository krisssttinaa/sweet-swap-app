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
    const { title, instructions, user_id, date_created, image } = recipeData;
    return conn.query(
        'INSERT INTO Recipe (title, instructions, user_id, date_created, image) VALUES (?, ?, ?, ?, ?)',
        [title, instructions, user_id, date_created, image]
    )
        .then(([result]) => result)
        .catch((err) => {
            console.error('Error creating recipe:', err);
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