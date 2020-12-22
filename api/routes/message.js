const express = require('express');
const router = express.Router();

const MessageController = require('../controllers/message');
const checkAuth = require('../middleware/checkAuth');

router.post('/', checkAuth, MessageController.message_send_message);

router.get('/:username', checkAuth, MessageController.message_get_messages);

module.exports = router;