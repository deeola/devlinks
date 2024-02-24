import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { LinksState, TLinks } from "../../types";
import { first } from "lodash";
import { RootState } from "../store";
import { error } from "console";

interface LinkedState {
  links: object[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | undefined;
}

const initialState: LinkedState = {
  links: [],
  status: 'idle',
  error: undefined
};

const PROMPT_URL = "http://localhost:3500/links";

export const getlinks = createAsyncThunk(
  "link/getlinks",
  async (user: string ) => {
    try {
      const response = await axios.get(`links/getlinks/${user}`);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

//delete thunk

export const deletePrompt = createAsyncThunk(
  "prompt/deletePrompt",
  async (promptId: string) => {
    try {
      const response = await axios.delete(PROMPT_URL, { data: { promptId } });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

//add thunk

export const addPrompt = createAsyncThunk(
  "prompt/addPrompt",
  async (prompt: any) => {
    try {
      console.log(prompt, "prompt")
      const response = await axios.post(PROMPT_URL, prompt);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);



const promptSlice = createSlice({
  name: "prompts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getlinks.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getlinks.fulfilled, (state, action) => {
      return (state = {
        ...state,
        links: action.payload,
        status: "succeeded",
        error: undefined,
      });
    });

    builder.addCase(getlinks.rejected, (state, action) => {
    state.status = "failed";
    state.error = action.error.message;
    console.log(state.error, "action");
    });

    builder.addCase(deletePrompt.fulfilled, (state, action) => {
      return (state = {
        ...state,
        links: action.payload,
        status: "succeeded",
        error: undefined,
      });
      });

      builder.addCase(addPrompt.fulfilled, (state, action) => {
        return (state = {
          ...state,
          links: action.payload,
          status: "succeeded",
          error: undefined,
        });
        });


  },
});



export const selectAllPrompts = (state: RootState) => state.promptSlice.links;


export default promptSlice.reducer;
