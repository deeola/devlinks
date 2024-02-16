const usersDB = {
    userInfo: require('../model/userInfo.json'),
    setUserInfo: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');

const handleNewUserInfo = async (req, res) => {
    const { firstName, lastName, email, profilePicture } = req.body;
    if (!firstName || !lastName ) return res.status(400).json({ 'message': 'First name and last name are required.' });

    try {

        const newUserInfo = {"firstName": firstName, "lastName": lastName, "email": email, "profilePicture": profilePicture };
        usersDB.setUserInfo([...usersDB.userInfo, newUserInfo]);

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'userInfo.json'),
            JSON.stringify(usersDB.userInfo)
        );
        res.status(201).json({ 'success': `New user info ${firstName} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUserInfo };