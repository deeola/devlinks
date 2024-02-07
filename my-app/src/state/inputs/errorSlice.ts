import { createSlice } from "@reduxjs/toolkit";
export interface ErrorState {
    message: string;
    code: number;
}

const initialErrorState: ErrorState = {
    message: "",
    code: 0,
};

export const errorSlice = createSlice({
    name: "error",
    initialState: initialErrorState,
    reducers: {
        setError: (state, action) => {
            state.message = action.payload.message;
            state.code = action.payload.code;
        },
        clearError: (state) => {
            state.message = "";
            state.code = 0;
        },
    },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;