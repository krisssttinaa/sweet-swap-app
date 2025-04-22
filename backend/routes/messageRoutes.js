const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');

router.get('/', auth, messageController.getAllMessages);
router.get('/:id', auth, messageController.getMessageById);
router.post('/', auth, messageController.createMessage);
router.delete('/:id', auth, messageController.deleteMessage);

module.exports = router;