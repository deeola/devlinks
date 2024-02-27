import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import {ILinks, TLinks} from "../../types";
import { RootState } from "../store";


const initialState: ILinks = {
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

interface DeletePromptParams {
  id: string;
  label: string;
  userId: string;
}


export const deletePrompt = createAsyncThunk(
  "prompt/deletePrompt",
  async ({id, label, userId}: DeletePromptParams ) => {
    try {
      const response = await axios.delete(PROMPT_URL, { data: { id, label, userId } });
      console.log(response.data, "response.data");
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
      const response = await axios.post(PROMPT_URL, prompt);
      console.log(response, "response.data");
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
      state.error = undefined;
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
    });

    //Add Prompts builder
    builder.addCase(addPrompt.pending, (state, action) => {
      state.status = "loading";
      state.error = undefined;
    });

    
    builder.addCase(addPrompt.fulfilled, (state, action) => {

      // const currentState = state.getState();
      // console.log(currentState, "state")
      const foundPrompt =state.links.find((link) => link.id === action.payload.id);
      if (foundPrompt) {
        return (state = {
          ...state,
          links: state.links.map((link) => {
            if (link.id === action.payload.id) {
              return action.payload;
            }
            return link;
          }),
          status: "succeeded",
          error: undefined,
        });
      }
    });

      builder.addCase(addPrompt.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

      builder.addCase(deletePrompt.pending, (state, action) => {
        state.status = "loading";
        state.error = undefined;
      })

    builder.addCase(deletePrompt.fulfilled, (state, action) => {

       const deletedPromptId = action.meta.arg.id; // Assuming action.meta.arg contains the parameters passed to deletePrompt

       if(deletedPromptId) {
        return (state = {
          ...state,
          links: state.links.filter(link=> link.id !== deletedPromptId),
          status: "succeeded",
          error: undefined,
        });
       }
      });

      builder.addCase(deletePrompt.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    


  },
});



export const selectAllPrompts = (state: RootState) => state.promptSlice.links;


export default promptSlice.reducer;
