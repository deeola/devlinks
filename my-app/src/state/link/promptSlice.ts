import { createSlice } from "@reduxjs/toolkit";

const promptSlice = createSlice({
    name:"prompts",
    initialState: [] as any,
    reducers:{
        setPrompt: (state, action) => {
            state = action.payload;

        }
    }
})

export const { setPrompt } = promptSlice.actions;

export default promptSlice.reducer;