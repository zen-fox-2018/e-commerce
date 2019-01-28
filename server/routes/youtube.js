const express = require('express');
const router = express.Router();
const youtubeController = require('../controllers/youtubeController');

router.get('/:keyword', youtubeController.getVideo)

module.exports = router;