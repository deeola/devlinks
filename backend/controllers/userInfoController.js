const userInfoDB = require("../model/UserInfo");

const getAllUserInfo = async (req, res) => {
  const userInfo = await userInfoDB.find();
  if (!userInfo)
    return res.status(204).json({ message: "No user information  found." });
  res.json(userInfo);
};

const handleNewUserInfo = async (req, res) => {
  const { firstName, lastName, email, profilePicture } = req.body;
  if (!firstName || !lastName)
    return res
      .status(400)
      .json({ message: "First name and last name are required." });

  try {
    const result = await userInfoDB.create({
      firstName: firstName,
      lastName: lastName,
      profileImage: profilePicture,
      email: email,
    });

    console.log(result);

    res.status(201).json({ success: `New user info ${firstName} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllUserInfo, handleNewUserInfo };
