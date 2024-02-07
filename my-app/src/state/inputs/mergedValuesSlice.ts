
import { createSlice } from "@reduxjs/toolkit";



export type MergedValues = { 
    id: number;
    value: string;
    label: string;
    bgColor: string;
    image?: string;
}

const initialState = {
  mergedValue: { id: 0, value: "", label: "", bgColor: "", image:"" } as MergedValues
};

export const mergedValuesSlice = createSlice({
  name: "mergedValues",
  initialState,
  reducers: {
    updateMergedValue: (state, action) => {
        state.mergedValue = { ...state.mergedValue, ...action.payload };
    }
  },
});

export const { updateMergedValue } = mergedValuesSlice.actions;

export default mergedValuesSlice.reducer;
