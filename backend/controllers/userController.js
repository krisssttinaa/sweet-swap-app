const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password, name, surname, country } = req.body;
    try {
        let user = await User.authUser(username);
        if (user.length > 0) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.createUser({
            username,
            password: hashedPassword,
            email,
            name,
            surname,
            country,
            role: 'user',
            dietary_goals: null,
            registration_date: new Date(),
            amount_achievements: 0
        });

        const payload = { user: { id: user[0].user_id, username: user[0].username } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        console.log('Login endpoint hit');
        let user = await User.authUser(username);
        if (user.length === 0) {
            console.log('User not found');
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const hashedPassword = user[0].password;
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = { user: { id: user[0].user_id, username: user[0].username } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({
                token,
                user: {
                    id: user[0].user_id,
                    username: user[0].username,
                    email: user[0].email,
                    name: user[0].name,
                    surname: user[0].surname,
                }
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
  
exports.profile = async (req, res) => {
    try {
        const user = await User.getUserById(req.user.id);
        res.json(user[0]); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.getUserById(req.params.id);
        if (!user.length) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateProfile = async (req, res) => {
    const { name, surname, email, password, dietaryGoals } = req.body;
    const userId = req.user.id;
    try {
        const user = await User.getUserById(userId);
        if (!user.length) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const updatedUser = {
            name: name || user[0].name,
            surname: surname || user[0].surname,
            email: email || user[0].email,
            dietary_goals: dietaryGoals || user[0].dietary_goals,
        };

        if (password && password !== '********') {
            const salt = await bcrypt.genSalt(10);
            updatedUser.password = await bcrypt.hash(password, salt);
        }

        await User.updateUser(userId, updatedUser);
        res.json({ msg: 'Profile updated successfully' });
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).send('Server error');
    }
};