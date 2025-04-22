const conn = require('../config/db');

const User = {};

User.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM User', (err, res) => {
            if (err) {
                console.error('Error fetching all users:', err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

User.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM User WHERE user_id = ?';
        //console.log(`Executing query: ${query} with ID: ${id}`);
        conn.query(query, [id], (err, res) => {
            if (err) {
                console.error(`Error fetching user with ID ${id}:`, err);
                return reject(err);
            }
            //console.log(`Query result for user with ID ${id}:`, res);
            return resolve(res);
        });
    });
};

User.createUser = (userData) => {
    const { username, password, email, name, surname, country, role, dietary_goals, registration_date, amount_achievements } = userData;
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO User (username, password, email, name, surname, country, role, dietary_goals, registration_date, amount_achievements) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [username, password, email, name, surname, country, role, dietary_goals, registration_date, amount_achievements],
            (err, res) => {
                if (err) {
                    console.error('Error creating user:', err);
                    return reject(err);
                }
                return resolve(res);
            }
        );
    });
};

User.authUser = (username) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM User WHERE username = ?', [username], (err, res) => {
            if (err) {
                console.error(`Error authenticating user ${username}:`, err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

module.exports = User;