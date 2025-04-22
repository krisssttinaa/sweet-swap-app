const Post = require('../models/post');

exports.getAllPosts = async (req, res) => { // Method to get all posts (accessible without authentication)
    try {
        const posts = await Post.getAllPosts();
        res.json(posts);
    } catch (err) {
        console.error('Error fetching all posts:', err);
        res.status(500).send('Server error');
    }
};

exports.getPostById = async (req, res) => { // Method to get a post by ID (accessible without authentication)
    const postId = req.params.id;
    try {
        const post = await Post.getPostById(postId);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        console.error(`Error fetching post with ID ${postId}:`, err);
        res.status(500).send('Server error');
    }
};

exports.createPost = async (req, res) => {
    const { user_id, recipe_id, content } = req.body;
    try {
        const newPost = await Post.createPost({
            user_id,
            recipe_id,
            content,
            date_posted: new Date()
        });
        res.json(newPost);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deletePost = async (req, res) => {
    try {
        await Post.deletePost(req.params.id);
        res.json({ msg: 'Post deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.searchPosts = async (req, res) => { // Method to search posts by keyword (accessible without authentication)
    const keyword = req.query.q;
    try {
        const posts = await Post.searchPosts(keyword);
        res.json(posts);
    } catch (err) {
        console.error(`Error searching posts with keyword ${keyword}:`, err);
        res.status(500).send('Server error');
    }
};