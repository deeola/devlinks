const express = require('express');
const router = express.Router();
const registerController = require('../controllers/userInfoController');

router.post('/', registerController.handleNewUserInfo);

module.exports = router;