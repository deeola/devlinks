import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Input = {
  error: boolean | null;
  value: string;
  touched: boolean;
  type: string;
  errorMessage: string;
};

const initialState: Input = {
  value: "",
  error: false,
  touched: false,
  type: "text",
  errorMessage: "",
};

const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    updateValue: (state, action: PayloadAction<string>) => {
        state.value = action.payload;
        state.touched = true; 
    },

    validateField: (state) => {
      if (state.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        state.errorMessage = "Please enter a valid email address.";
        state.error = !emailRegex.test(state.value);
      } else if (state.type === "text") {
        state.error = state.value.trim() === '';
        state.errorMessage = "Please enter a value.";
        
      } else if (state.type === "number") {
        state.errorMessage = "Please enter a number.";
        state.error = isNaN(Number(state.value));
      } else {
        state.errorMessage = "";
        state.error = null; 
      }
    },
  },
});

export const { updateValue, validateField } = inputSlice.actions;

export default inputSlice.reducer;
