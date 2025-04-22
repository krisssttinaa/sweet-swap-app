const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

router.get('/', auth, commentController.getAllComments);
router.get('/:id', auth, commentController.getCommentById);
router.post('/', auth, commentController.createComment);
router.delete('/:id', auth, commentController.deleteComment);

module.exports = router;