
import { createSlice } from "@reduxjs/toolkit";
import { StringIterator } from "lodash";



export type MergedValues = { 
    prompt: string,
    answer: string,
    label: string,
    bgColor: string,
    image: string,
    id: string,
    placeholder: string,
    urlAddress: string,
    timestamp: number,
}

const initialState = {
  mergedValue:{  prompt: "",
  answer: "",
  label: "",
  bgColor: "",
  image: "",
  id: "",
  placeholder: "",
  urlAddress: "",
  timestamp: new Date().getTime(), } as MergedValues
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
