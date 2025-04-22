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

Comment.createComment = (commentData) => {
    const { post_id, user_id, content, date_commented } = commentData;
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO Comment (post_id, user_id, content, date_commented) VALUES (?, ?, ?, ?)',
            [post_id, user_id, content, date_commented],
            (err, res) => {
                if (err) {
                    console.error('Error creating comment:', err);
                    return reject(err);
                }
                return resolve(res);
            }
        );
    });
};

Comment.deleteComment = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM Comment WHERE comment_id = ?', [id], (err, res) => {
            if (err) {
                console.error(`Error deleting comment with ID ${id}:`, err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

module.exports = Comment;