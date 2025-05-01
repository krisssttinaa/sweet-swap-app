const db = require('../config/db');

const SavedRecipe = {
    async create(userId, recipeId) {
        const query = `INSERT INTO SavedRecipes (user_id, recipe_id) VALUES (?, ?)`;
        await db.execute(query, [userId, recipeId]);
    },

    async delete(userId, recipeId) {
        const query = `DELETE FROM SavedRecipes WHERE user_id = ? AND recipe_id = ?`;
        await db.execute(query, [userId, recipeId]);
    },

    async findByUser(userId) {
        const query = `
            SELECT r.* 
            FROM SavedRecipes sr
            JOIN Recipe r ON sr.recipe_id = r.recipe_id
            WHERE sr.user_id = ?`;
        const [results] = await db.execute(query, [userId]);
        return results;
    },

    async findAll() {
        const query = `SELECT * FROM SavedRecipes`;
        const [results] = await db.execute(query);
        return results;
    }
};

module.exports = SavedRecipe;