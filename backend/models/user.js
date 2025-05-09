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
    const { username, name, surname, email, password, dietary_goals, country, profile_picture } = userData;
    return conn.query(
        'UPDATE User SET username = ?, name = ?, surname = ?, email = ?, password = ?, dietary_goals = ?, country = ?, profile_picture = ? WHERE user_id = ?',
        [username, name, surname, email, password, dietary_goals, country, profile_picture, id]
    )
    .then(([result]) => result)
    .catch((err) => {
        console.error(`Error updating user with ID ${id}:`, err);
        throw err;
    });
};

User.deleteUser = (id) => {
    return conn.query('DELETE FROM User WHERE user_id = ?', [id])
        .then(([result]) => result)
        .catch((err) => {
            console.error(`Error deleting user with ID ${id}:`, err);
            throw err;
        });
};


module.exports = User;