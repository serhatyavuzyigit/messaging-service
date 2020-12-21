const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/user');

router.get('/', UsersController.user_get_all);

router.post('/signup', UsersController.user_signup);

router.post('/login', UsersController.user_login);

router.delete('/:userId', UsersController.user_delete);


module.exports = router;