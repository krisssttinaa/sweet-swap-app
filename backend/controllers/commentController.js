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

exports.createComment = async (req, res) => {
    const { post_id, user_id, content } = req.body;
    try {
        const newComment = await Comment.createComment({
            post_id,
            user_id,
            content,
            date_commented: new Date()
        });
        res.json(newComment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteComment = async (req, res) => {
    try {
        await Comment.deleteComment(req.params.id);
        res.json({ msg: 'Comment deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};