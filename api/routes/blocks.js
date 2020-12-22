const express = require('express');
const router = express.Router();

const BlocksController = require('../controllers/blocks');
const checkAuth = require('../middleware/checkAuth');

router.post('/', checkAuth, BlocksController.blocks_add_blocks);

module.exports = router;