const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/create', auth, upload.single('image'), recipeController.createRecipe);
router.get('/', recipeController.getAllRecipes);
router.get('/newest', recipeController.getNewestRecipes);
router.get('/:id', recipeController.getRecipeById);
router.delete('/:id', auth, recipeController.deleteRecipe);
router.get('/category/:category', recipeController.getRecipesByCategory);

module.exports = router;