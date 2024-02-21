const express = require('express');
const router = express.Router();
const handlePostImageController = require('../controllers/postImageController');

router.get('/', handlePostImageController.handlePostImage );

module.exports = router;