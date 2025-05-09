const Comment = require('../models/comment');

exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.getAllComments();
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.getCommentById(req.params.id);
        if (!comment.length) {
            return res.status(404).json({ msg: 'Comment not found' });
        }
        res.json(comment[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getCommentsByRecipeId = async (req, res) => {
    const recipe_id = req.params.recipe_id;

    try {
        const comments = await Comment.getCommentsByRecipeId(recipe_id);
        if (!comments.length) {
            //console.log(`No comments found for recipe ID: ${recipe_id}`);
            return res.status(200).json([]);  // Return an empty array if no comments are found
        }
        //console.log('Sending comments to frontend:', comments);
        res.status(200).json(comments);  // Send comments to the frontend
    } catch (err) {
        console.error(`Error fetching comments for recipe ID ${recipe_id}:`, err.message);
        res.status(500).send('Server error');
    }
};


exports.createComment = async (req, res) => {
    const { recipe_id, user_id, content } = req.body;

    try {
        const newComment = await Comment.createComment({
            recipe_id,
            user_id,
            content,
            date_commented: new Date()
        });
        //console.log('New comment created:', newComment);
        res.json(newComment);
    } catch (err) {
        console.error('Error creating comment:', err.message);
        res.status(500).send('Server error');
    }
};

exports.updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        const updatedComment = await Comment.updateComment(id, content);
        if (updatedComment.affectedRows === 0) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json({ message: 'Comment updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        await Comment.deleteComment(id);
        console.log(`Comment with ID ${id} deleted`);
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        console.error(`Error deleting comment with ID ${id}:`, err.message);
        res.status(500).send('Server error');
    }
};