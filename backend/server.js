const http = require('http');
const app = require('./app'); // Import the configured app from app.js

const port = process.env.PORT || 8188;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});