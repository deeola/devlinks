const userInfoDB = require("../model/UserInfo");

const getAllUserInfo = async (req, res) => {
  const userInfo = await userInfoDB.find();
  if (!userInfo)
    return res.status(204).json({ message: "No user information  found." });
  res.json(userInfo);
};


const handleNewUserInfo = async (req, res) => {
  const {firstName, lastName, email } = req.body;
  if (!firstName && !lastName && !email) {
    return res.status(400).json({ message: "At least one field is required to update." });
  }

  try {
    let userInfo;
    if (email) {
      userInfo = await userInfoDB.findOne({ email });
      if (!email) {
        return res.status(404).json({ message: "User not found." });
      }
    } else {
      userInfo = {};
    }

    if (firstName) {
      userInfo.firstName = firstName;
    }
    if (lastName) {
      userInfo.lastName = lastName;
    }
    if (email) {
      userInfo.email = email;
    }


    const result = await userInfoDB.findOneAndUpdate({ email: email }, userInfo, { new: true });


    if (result) {
      res.status(200).json({ success: "User info updated successfully." });
    } else {
      res.status(500).json({ message: "Failed to update user info." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const getSpecificUserInfo = async (req, res) => {
  const userEmail = req.query.email;
  try {
    const userInfo = await userInfoDB.findOne({ email: userEmail });
    
    if (!userInfo) {
      return res.status(400).json({ message: "User not found." });
    }

    res.json(userInfo);
  } catch (error) {
    console.error("Error retrieving user information:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { getAllUserInfo, handleNewUserInfo, getSpecificUserInfo };
