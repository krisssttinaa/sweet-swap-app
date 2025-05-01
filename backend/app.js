const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const recipeRoutes = require('./routes/recipeRoutes'); // Import recipe routes
const app = express();

const port = process.env.PORT || 8288;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Debugging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);


app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send('Server error');
});

app.get("/", (req, res) => {
  res.send("Welcome to Sweet Swap API");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;