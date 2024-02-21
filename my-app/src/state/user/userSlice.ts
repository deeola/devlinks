import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


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