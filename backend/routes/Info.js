const express = require('express');
const router = express.Router();
const userInfoController = require('../controllers/userInfoController');



router.route('/')
    .get(userInfoController.getAllUserInfo)
    .post(userInfoController.handleNewUserInfo)

router.route('/specific')
    .get(userInfoController.getSpecificUserInfo)

module.exports = router;