import { createSlice } from "@reduxjs/toolkit";

type dropdown = {
    dropArray: {
        image: string;
        label: string;
        selected?: boolean;
      }[];
      dropArrayImage: string
      selectedValue: string;
      onChange: (value: string) => void;
}
const initialState: dropdown = {
    dropArray: [],
    dropArrayImage: "",
    selectedValue: "",
    onChange: (value: string) => {}
}

const dropdownSlice = createSlice({
    name: "dropdown",
    initialState,
    reducers: {
        addboth: (state, action) => {
            state.dropArray = action.payload.dropArray;
            state.dropArrayImage = action.payload.dropArrayImage;
            state.selectedValue = action.payload.selectedValue;
            state.onChange = action.payload.onChange;
        }
    }
});


export const { addboth } = dropdownSlice.actions;

export default dropdownSlice.reducer;