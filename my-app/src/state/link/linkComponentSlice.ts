import { createSlice } from "@reduxjs/toolkit";
// import AddLink from "../../components/Addlink/AddLink";
import { ReactNode } from "react";

type component = {
    linkComponent: ReactNode;    
}

interface componentState {
    components: component[];
}

const initialState: componentState = {
    components: [],
}

const componentSlice = createSlice({

    name: "components",
    initialState,
    reducers: {
        addComponent: (state, action) => {
            state.components.push(action.payload);
        },
        removeAllComponents: (state) => {
            state.components = [];
        }
    },
});

export const { addComponent, removeAllComponents } = componentSlice.actions;

export default componentSlice.reducer;