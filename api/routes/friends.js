const express = require('express');
const router = express.Router();

const FriendsController = require('../controllers/friends');

router.post('/', FriendsController.friends_add_friends);

module.exports = router;