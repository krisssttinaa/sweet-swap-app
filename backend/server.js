const express = require('express');
require('dotenv').config();
const db = require('./config/db'); // Import the database connection
const app = express(); // Import the configured app from app.js
const port = process.env.PORT || 8288;
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const contactRoutes = require('./routes/contactRoutes');
const savedRoutes = require('./routes/savedRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/saved', savedRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
app.use('/api', contactRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to Sweet Swap API");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});