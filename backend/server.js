const express = require('express');
require('dotenv').config();
const db = require('./config/db'); // Import the database connection

const app = require('./app'); // Import the configured app from app.js
const port = process.env.PORT || 8288;

app.get("/", (req, res) => {
    res.send("Welcome to Sweet Swap API");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});