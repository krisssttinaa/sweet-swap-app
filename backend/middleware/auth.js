const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log('Decoded JWT:', decoded);
        req.user = decoded.user;
        if (!req.user) {
            console.log('User not found in decoded token');
            return res.status(401).json({ msg: 'Token is not valid' });
        }
        next();
    } catch (err) {
        console.log('Token verification failed:', err.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};