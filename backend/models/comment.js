const conn = require('../config/db');

const Comment = {};

Comment.getAllComments = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Comment', (err, res) => {
            if (err) {
                console.error('Error fetching all comments:', err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

Comment.getCommentById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Comment WHERE comment_id = ?', [id], (err, res) => {
            if (err) {
                console.error(`Error fetching comment with ID ${id}:`, err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

Comment.getCommentsByRecipeId = (recipe_id) => {
    return conn.query(`
        SELECT c.*, u.username 
        FROM Comment c 
        JOIN User u ON c.user_id = u.user_id
        WHERE c.recipe_id = ?`, [recipe_id])
        .then(([rows, fields]) => rows)
        .catch((err) => {
            console.error(`Error fetching comments for recipe ID ${recipe_id}:`, err);
            throw err;
        });
};

Comment.createComment = (commentData) => {
    const { recipe_id, user_id, content, date_commented } = commentData;
    return conn.query(
        'INSERT INTO Comment (recipe_id, user_id, content, date_commented) VALUES (?, ?, ?, ?)',
        [recipe_id, user_id, content, date_commented]
    )
    .then(([result]) => result)
    .catch((err) => {
        console.error('Error creating comment:', err);
        throw err;
    });
};

Comment.updateComment = (id, content) => {
    return conn.query('UPDATE Comment SET content = ? WHERE comment_id = ?', [content, id])
        .then(([result]) => result)
        .catch((err) => {
            console.error('Error updating comment:', err);
            throw err;
        });
};

Comment.deleteComment = (comment_id) => {
    return conn.query('DELETE FROM Comment WHERE comment_id = ?', [comment_id])
        .then(([result]) => result)
        .catch((err) => {
            console.error(`Error deleting comment with ID ${comment_id}:`, err);
            throw err;
        });
};

module.exports = Comment;