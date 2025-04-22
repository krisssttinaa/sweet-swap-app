const Message = require('../models/message');

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.getAllMessages();
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getMessageById = async (req, res) => {
    try {
        const message = await Message.getMessageById(req.params.id);
        if (!message.length) {
            return res.status(404).json({ msg: 'Message not found' });
        }
        res.json(message[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createMessage = async (req, res) => {
    const { sender_id, receiver_id, content } = req.body;
    try {
        const newMessage = await Message.createMessage({
            sender_id,
            receiver_id,
            content,
            date_sent: new Date()
        });
        res.json(newMessage);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        await Message.deleteMessage(req.params.id);
        res.json({ msg: 'Message deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};