const userInfoDB = require("../model/UserInfo");

const getAllUserInfo = async (req, res) => {
  const userInfo = await userInfoDB.find();
  if (!userInfo)
    return res.status(204).json({ message: "No user information  found." });
  res.json(userInfo);
};


const handleNewUserInfo = async (req, res) => {
  const { firstName, lastName, email, imgName } = req.body;
  
  if (!firstName && !lastName && !email && !imgName) {
    return res.status(400).json({ message: "At least one field is required to update." });
  }

  try {
    let userInfo = await userInfoDB.findOne({ email });

    if (!userInfo) {
      // If no user found, create a new userInfo
      userInfo = new userInfoDB();
      userInfo.email = email;
    }

    if (firstName) {
      userInfo.firstName = firstName;
    }
    if (lastName) {
      userInfo.lastName = lastName;
    }
    if (imgName) {
      userInfo.imgName = imgName;
    } 

    await userInfo.save();

    res.status(200).json({ success: "User info updated successfully." });
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
