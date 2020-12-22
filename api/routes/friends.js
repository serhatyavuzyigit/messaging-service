const express = require('express');
const router = express.Router();

const FriendsController = require('../controllers/friends');
const checkAuth = require('../middleware/checkAuth');

router.post('/', checkAuth, FriendsController.friends_add_friends);

module.exports = router;