import {createSlice} from "@reduxjs/toolkit";
import { MergedValues } from "../inputs/mergedValuesSlice";


interface LinkState {
    links: MergedValues[];
}

const initialState: LinkState = {
    links: []
}


const linkSlice = createSlice({
    name:"link",
    initialState,
    reducers:{
        addNewLink: (state, action) => {
            const { payload } = action;
            const linkExists = state.links.some(link => link.id === payload.id);
            if (!linkExists) {
                state.links.push(payload);
              } else {
                // dispatch(showDuplicateLinkNotification()); 
              }
        },
        removeLink: (state, action) => {
            state.links = state.links.filter(link => link.id !== action.payload);        
        }
    },
});

export const { addNewLink, removeLink } = linkSlice.actions;

export default linkSlice.reducer;


