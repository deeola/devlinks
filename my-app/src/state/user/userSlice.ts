import {createSlice} from "@reduxjs/toolkit";


type User = { 
    id: number;
    name: string;
    email: string;
    password: string;
    picture?: string;
}


interface UserState {
    users: User[];
}

const initialState: UserState = { 
    users: []
}


const userSlice = createSlice({ 
    name:"user",
    initialState,
    reducers:{
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
    },
});

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;