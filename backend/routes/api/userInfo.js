const express = require('express');
const router = express.Router();
const userInfoController = require('../../controllers/userInfoController');



router.route('/')
    .get(userInfoController.getAllUserInfo)
    .post(userInfoController.handleNewUserInfo)

module.exports = router;