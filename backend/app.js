const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');

const app = express();

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Custom logging middleware
app.use(logger);

// Routes
app.use('/api', routes); // Use the routes defined in your routes directory

// Error handling middleware
app.use(errorHandler);

module.exports = app;