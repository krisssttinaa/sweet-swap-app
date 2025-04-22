const conn = require('../config/db');

const Recipe = {};

Recipe.getAllRecipes = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Recipe', (err, res) => {
            if (err) {
                console.error('Error fetching all recipes:', err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

Recipe.getRecipeById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Recipe WHERE recipe_id = ?', [id], (err, res) => {
            if (err) {
                console.error(`Error fetching recipe with ID ${id}:`, err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

Recipe.createRecipe = (recipeData) => {
    const { user_id, title, product_id, instructions, date_created } = recipeData;
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO Recipe (user_id, title, product_id, instructions, date_created) VALUES (?, ?, ?, ?, ?)',
            [user_id, title, product_id, instructions, date_created],
            (err, res) => {
                if (err) {
                    console.error('Error creating recipe:', err);
                    return reject(err);
                }
                return resolve(res);
            }
        );
    });
};

Recipe.deleteRecipe = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM Recipe WHERE recipe_id = ?', [id], (err, res) => {
            if (err) {
                console.error(`Error deleting recipe with ID ${id}:`, err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

module.exports = Recipe;