const conn = require('../config/db');
const User = {};

User.getAllUsers = () => {
    return conn.query('SELECT * FROM User')
        .then(([rows, fields]) => rows)
        .catch((err) => {
            console.error('Error fetching all users:', err);
            throw err;
        });
};

User.getUserById = (id) => {
    return conn.query('SELECT * FROM User WHERE user_id = ?', [id])
        .then(([rows, fields]) => rows)
        .catch((err) => {
            console.error(`Error fetching user with ID ${id}:`, err);
            throw err;
        });
};

User.createUser = (userData) => {
    const { username, password, email, name, surname, country, role, dietary_goals, registration_date, amount_achievements } = userData;
    return conn.query(
        'INSERT INTO User (username, password, email, name, surname, country, role, dietary_goals, registration_date, amount_achievements) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [username, password, email, name, surname, country, role, dietary_goals, registration_date, amount_achievements]
    )
        .then(([result]) => result)
        .catch((err) => {
            console.error('Error creating user:', err);
            throw err;
        });
};

User.authUser = (username) => {
    return conn.query('SELECT * FROM User WHERE username = ?', [username])
        .then(([rows, fields]) => rows)
        .catch((err) => {
            console.error(`Error authenticating user ${username}:`, err);
            throw err;
        });
};

User.updateUser = (id, userData) => {
    const { name, surname, email, password } = userData;
    return conn.query(
        'UPDATE User SET name = ?, surname = ?, email = ?, password = ? WHERE user_id = ?',
        [name, surname, email, password, id]
    )
        .then(([result]) => result)
        .catch((err) => {
            console.error(`Error updating user with ID ${id}:`, err);
            throw err;
        });
};

module.exports = User;