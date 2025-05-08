const conn = require('../config/db');
const Message = {};

Message.getAllMessages = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Message', (err, res) => {
            if (err) {
                console.error('Error fetching all messages:', err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

Message.getMessageById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Message WHERE message_id = ?', [id], (err, res) => {
            if (err) {
                console.error(`Error fetching message with ID ${id}:`, err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

Message.createMessage = (messageData) => {
    const { sender_id, receiver_id, content, date_sent } = messageData;
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO Message (sender_id, receiver_id, content, date_sent) VALUES (?, ?, ?, ?)',
            [sender_id, receiver_id, content, date_sent],
            (err, res) => {
                if (err) {
                    console.error('Error creating message:', err);
                    return reject(err);
                }
                return resolve(res);
            }
        );
    });
};

Message.deleteMessage = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM Message WHERE message_id = ?', [id], (err, res) => {
            if (err) {
                console.error(`Error deleting message with ID ${id}:`, err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

module.exports = Message;