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
            payload.forEach((prompt: any) => {
                // const linkExists = state.links.some(link => link.id === prompt.id);
                // if (!linkExists) {
                //   state.links.push(prompt);
                // } else {
                //   // dispatch(showDuplicateLinkNotification()); 
                // }

                const existingIndex = state.links.findIndex(link => link.id === prompt.id);
    if (existingIndex !== -1) {
        // Replace the existing item with the updated one
        state.links[existingIndex] = prompt;
        // Optionally dispatch a notification for a duplicate link
        // dispatch(showDuplicateLinkNotification());
    } else {
        // Item doesn't exist, so add it to state.links
        state.links.push(prompt);
    }
              });
        },
        removeLink: (state, action) => {
            state.links = state.links.filter(link => link.id !== action.payload);        
        }
    },
});

export const { addNewLink, removeLink } = linkSlice.actions;

export default linkSlice.reducer;


