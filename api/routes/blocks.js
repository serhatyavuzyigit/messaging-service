const express = require('express');
const router = express.Router();

const BlocksController = require('../controllers/blocks');

router.post('/', BlocksController.blocks_add_blocks);

module.exports = router;