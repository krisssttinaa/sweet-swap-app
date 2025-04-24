const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log('Decoded token:', decoded); // Log the decoded token
    req.user = decoded.user;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};