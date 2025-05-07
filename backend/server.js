const express = require('express');
const path = require('path'); // Import the path module
require('dotenv').config();
const db = require('./config/db'); // Import the database connection
const app = express();
const port = process.env.PORT || 8288;
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const contactRoutes = require('./routes/contactRoutes');
const savedRoutes = require('./routes/savedRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use(cors());
app.use(express.json());

app.post('/api/test-comments', (req, res) => {
    console.log('Test route hit');
    res.status(200).json({ message: 'Test route works' });
});


app.use('/api/comments', commentRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
app.use('/api', contactRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app._router.stack.forEach(function (r) {
    if (r.route && r.route.path) {
        console.log(r.route.path);
    }
});

app.get("/", (req, res) => {
    res.send("Welcome to Sweet Swap API");
});
app.get('/api/comments/recipe/:recipe_id', (req, res) => {
    const recipe_id = req.params.recipe_id;
    console.log('Received request for recipe_id:', recipe_id); // This logs the recipe_id to the terminal
    res.json({ message: `Received recipe_id: ${recipe_id}` });
});
app.get('/api/comments/recipe/:recipe_id', (req, res) => {
    console.log("Received request for comments for recipe:", req.params.recipe_id);
    res.json({ message: "Logging works!" });
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});