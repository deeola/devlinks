/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice } from "@reduxjs/toolkit";

import { type MergedValues } from "../../types";

const initialState = {
  mergedValue: {
    prompt: "",
    answer: "",
    label: "",
    bgColor: "",
    image: "",
    id: "",
    placeholder: "",
    urlAddress: "",
    timestamp: new Date().getTime()
  } as MergedValues
};

export const mergedValuesSlice = createSlice({
  name: "mergedValues",
  initialState,
  reducers: {
    updateMergedValue: (state, action) => {
      state.mergedValue = { ...state.mergedValue, ...action.payload };
    }
  }
});

export const { updateMergedValue } = mergedValuesSlice.actions;

export default mergedValuesSlice.reducer;
