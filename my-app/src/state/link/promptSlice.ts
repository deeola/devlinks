import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/axios";


export interface LinkData {
 
}

interface LinksCredentials {
  user: string | undefined;
}

export const getlinks = createAsyncThunk<LinkData[], LinksCredentials>(
  "link/getlinks",
  async ({ user }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`links/getlinks/${user}`);

      console.log(response.data, "response.data")
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

interface LinksState {
  links: LinkData[]; // Update the type definition of links
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LinksState = {
  links: [], // Update initial state to match the new type definition
  status: 'idle',
  error: null
};

const promptSlice = createSlice({
  name: "prompts",
  initialState,
  reducers: {
    setPrompt: (state, action: PayloadAction<LinkData[]>) => {
      state.links = action.payload;
      state.status = "succeeded";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getlinks.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getlinks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.links = action.payload;
        state.error = null;
      })
      .addCase(getlinks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = "There is an error fetching the links";
      });
  }
});

export const { setPrompt } = promptSlice.actions;


export default promptSlice.reducer;
