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

        const payload = { user: { username } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error('Error registering user:', err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      let user = await User.authUser(username);
      if (user.length === 0) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user[0].password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
  
      const payload = { user: { id: user[0].user_id, username: user[0].username } };
  
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error('Error logging in:', err.message);
      res.status(500).send('Server error');
    }
};

exports.profile = async (req, res) => {
    try {
        const user = await User.getUserById(req.user.id);
        if (!user.length) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user[0]);
    } catch (err) {
        console.error('Error fetching profile:', err.message);
        res.status(500).send('Server error');
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err.message);
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
        console.error('Error fetching user by ID:', err.message);
        res.status(500).send('Server error');
    }
};
