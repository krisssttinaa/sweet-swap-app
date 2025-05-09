const express = require('express');
const path = require('path');
require('dotenv').config();
const db = require('./config/db');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8288;

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);


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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get("/", (req, res) => { // Serve the React app's index.html on root route
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// This middleware handles any other routes and sends them to the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app._router.stack.forEach(function (r) { // Debugging Route Paths
    if (r.route && r.route.path) {
        console.log(r.route.path);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});