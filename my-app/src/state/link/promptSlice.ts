import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import {ILinks, TLinks} from "../../types";
import { RootState } from "../store";


const initialState: ILinks = {
  links: [],
  status: 'idle',
  error: undefined
};


//delete thunk






const promptSlice = createSlice({
  name: "prompts",
  initialState,
  reducers: {},
});



export const selectAllPrompts = (state: RootState) => state.promptSlice.links;


export default promptSlice.reducer;
