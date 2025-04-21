const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Add more routes as needed

module.exports = router;