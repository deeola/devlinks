import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface UserInfoCredentials {
  firstName: string;
  lastName: string;
  email: string;
}

interface ImageCredentials  {
  profileImage: React.SetStateAction<string>,
  email: string;
}

const UserImage: ImageCredentials = {
profileImage: "",
email: ""
}


// Define initial state
interface UserState {
  users: User | null; 
  status: 'idle' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  users: null,
  status: "idle",
  error: null,
};

// API endpoint URL
const USER_URL = "http://localhost:3500/info";
const GET_USER_URL = "http://localhost:3500/info/specific";
 const IMAGE_URL = "http://localhost:3500/s3upload";

// Define async thunk for posting user info
export const postUserInfo = createAsyncThunk<User, UserInfoCredentials >(
  "fetchUserInfo",
  async (loginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(USER_URL, loginCredentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define async thunk for fetching user info
// export const getSpecificUserInfo = createAsyncThunk<User, string>(
//   "fetchUserInfo",
//   async (email) => {
//     try {
//       const response = await axios.get(GET_USER_URL, { email});
//       return response.data;
//     } catch (error: any) {
//       return error.response.data;
//     }
//   }
// );

export const getSpecificUserInfo = createAsyncThunk(
  'userInfo/fetchUserInfo',
  async (email: string) => {
    try {
      const response = await axios.get(`${GET_USER_URL}?email=${email}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);





// export const userImageURLThunk = createAsyncThunk(
//   'fetchUserImage',
//   async (_, { rejectWithValue }) => { // Removed `imageCredentials` argument
//     try {
//       // Make a request to your backend endpoint to get the signed URL
//       const response = await axios.get(IMAGE_URL);

//       // Use the signed URL to upload the image directly to S3
//       const postImage = await axios.put(response.data.uploadURL, UserImage.profileImage, {
//         headers: { 'Content-Type': 'image/jpeg' }, 
//       });

//       // Assuming your backend also returns the user data after uploading the image

//       console.log(postImage.data.user, "postImage.data.user")
//       return postImage.data.user;

//     } catch (error: any) {
//       // Handle errors
//       return rejectWithValue(error.response.data);
//     }
//   }
// );





const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postUserInfo.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getSpecificUserInfo.pending, (state, action) => {
      state.users = {firstName: "", lastName: "", email: ""};
    });
    builder.addCase(getSpecificUserInfo.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getSpecificUserInfo.rejected, (state, action) => {
      state.users = {firstName: "", lastName: "", email: ""};
    });

  },
});



export const selectUser = (state: { user: { users: User; }; }) => state.user.users;

export default userSlice.reducer;