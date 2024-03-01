const express = require('express');
const router = express.Router();
const handlePictureController = require('../controllers/fileController');
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


router.get('/:imgName', handlePictureController.handleGetPicture) ;
router.post('/',upload.single('image'),  handlePictureController.handleUploadPicture);

module.exports = router;