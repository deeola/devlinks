const express = require('express');
const router = express.Router();
const handlePostImageController = require('../controllers/postImageController');
const handlePictureController = require('../controllers/fileController');
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


router.get('/', handlePostImageController.handlePostImage );
router.post('/',upload.single('image'),  handlePictureController.handleUploadPicture);

module.exports = router;