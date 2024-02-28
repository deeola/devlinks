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
  console.log("userEmail", userEmail);

  try {
    const userInfo = await userInfoDB.findOne({ email: userEmail });
    
    if (!userInfo) {

      console.log("User not found");
      return res.status(404).json({ message: 'No User found.' });
    }

    res.json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// const updateUserInfo = async (req, res) => {
//   const { firstName, lastName, email} = req.body

//   // Confirm data
//   if (!id || !user || !title || !text || typeof completed !== 'boolean') {
//       return res.status(400).json({ message: 'All fields are required' })
//   }

//   // Confirm note exists to update
//   const note = await Note.findById(id).exec()

//   if (!note) {
//       return res.status(400).json({ message: 'Note not found' })
//   }

//   // Check for duplicate title
//   const duplicate = await Note.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

//   // Allow renaming of the original note 
//   if (duplicate && duplicate?._id.toString() !== id) {
//       return res.status(409).json({ message: 'Duplicate note title' })
//   }

//   note.user = user
//   note.title = title
//   note.text = text
//   note.completed = completed

//   const updatedNote = await note.save()

//   res.json(`'${updatedNote.title}' updated`)
// }


module.exports = { getAllUserInfo, handleNewUserInfo, getSpecificUserInfo };
