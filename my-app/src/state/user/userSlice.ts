import { createSlice } from "@reduxjs/toolkit";
import { type UserState, type IUser } from "../../types";

const initialState: UserState = {
  users: null,
  status: "idle",
  error: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  }
});

export const selectUser = (state: { user: { users: IUser } }) => state.user.users;

export default userSlice.reducer;
