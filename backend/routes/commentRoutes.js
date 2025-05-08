const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

router.get('/recipe/:recipe_id', auth, commentController.getCommentsByRecipeId); //get all comments for a specific recipe
router.post('/', auth, commentController.createComment); 
router.get('/', auth, commentController.getAllComments);
router.get('/:id', auth, commentController.getCommentById);
router.delete('/:id', auth, commentController.deleteComment);
router.put('/:id', auth, commentController.updateComment); 

module.exports = router;