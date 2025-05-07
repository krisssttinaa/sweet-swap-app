const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

// Route to get all comments for a specific recipe
router.get('/recipe/:recipe_id', auth, commentController.getCommentsByRecipeId);

// Route to create a new comment
router.post('/', auth, commentController.createComment);

// Other routes...
router.get('/', auth, commentController.getAllComments);
router.get('/:id', auth, commentController.getCommentById);
router.delete('/:id', auth, commentController.deleteComment);
// Route to update a comment
router.put('/:id', auth, commentController.updateComment);

module.exports = router;
