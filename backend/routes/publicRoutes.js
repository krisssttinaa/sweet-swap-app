const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Public routes
router.get('/posts', postController.getAllPosts);
router.get('/posts/:id', postController.getPostById);
router.get('/search/posts', postController.searchPosts);

module.exports = router;