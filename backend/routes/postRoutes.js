const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');

router.get('/', auth, postController.getAllPosts);
router.get('/:id', auth, postController.getPostById);
router.post('/', auth, postController.createPost);
router.delete('/:id', auth, postController.deletePost);

module.exports = router;