import { createSlice } from "@reduxjs/toolkit";
import { type ILinks } from "../../types";
import { type RootState } from "../store";

const initialState: ILinks = {
  links: [],
  status: 'idle',
  error: undefined
};

// delete thunk

const promptSlice = createSlice({
  name: "prompts",
  initialState,
  reducers: {}
});

export const selectAllPrompts = (state: RootState) => state.promptSlice.links;

export default promptSlice.reducer;
