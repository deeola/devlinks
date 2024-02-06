import {createSlice} from "@reduxjs/toolkit";


type Link = {
id: number;
image: string;
label: string;
link: string;
bgcolor: string;
}

interface LinkState {
    links: Link[];
    onRemove: (id: number) => void;
}

const initialState: LinkState = {
    links: [],
    onRemove: (id: number) => {
        console.log("onRemove", id);
    }
}


const linkSlice = createSlice({
    name:"link",
    initialState,
    reducers:{
        addNewLink: (state, action) => {
            state.links.push(action.payload);
        },
        removeLink: (state, action) => {
            state.links = state.links.filter(link => link.id !== action.payload);
        },
    },
});

export const { addNewLink, removeLink } = linkSlice.actions;

export default linkSlice.reducer;


