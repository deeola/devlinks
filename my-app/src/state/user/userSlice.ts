import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { profile } from "console";


// Define types for user data and login credentials
interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface UserInfoCredentials {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: React.SetStateAction<string>;
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
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  users: null,
  status: "idle",
  error: null,
};

// API endpoint URL
const USER_URL = "http://localhost:3500/info";
 const IMAGE_URL = "http://localhost:3500/s3upload";

// Define async thunk for fetching user info
export const userInfoThunk = createAsyncThunk<User, UserInfoCredentials >(
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



export const userImageURLThunk = createAsyncThunk(
  'fetchUserImage',
  async (_, { rejectWithValue }) => { // Removed `imageCredentials` argument
    try {
      // Make a request to your backend endpoint to get the signed URL
      const response = await axios.get(IMAGE_URL);

      // Use the signed URL to upload the image directly to S3
      const postImage = await axios.put(response.data.uploadURL, UserImage.profileImage, {
        headers: { 'Content-Type': 'image/jpeg' }, 
      });

      // Assuming your backend also returns the user data after uploading the image

      console.log(postImage.data.user, "postImage.data.user")
      return postImage.data.user;

    } catch (error: any) {
      // Handle errors
      return rejectWithValue(error.response.data);
    }
  }
);








// Create user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reducer to update user information
    setUserInformation: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userInfoThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(userInfoThunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.users = action.payload;
      state.error = null;
    });
    builder.addCase(userInfoThunk.rejected, (state, action) => {
      state.status = 'failed';
      state.error = "There is an error fetching the links";
    });
  },
});

export const { setUserInformation } = userSlice.actions;

export default userSlice.reducer;