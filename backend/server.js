const express = require('express');
const path = require('path');
require('dotenv').config();
const db = require('./config/db');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8288;

const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const contactRoutes = require('./routes/contactRoutes');
const savedRoutes = require('./routes/savedRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/comments', commentRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
app.use('/api', contactRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => { // Home Route
    res.send("Welcome to Sweet Swap API");
});

app._router.stack.forEach(function (r) { // Debugging Route Paths
    if (r.route && r.route.path) {
        console.log(r.route.path);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});