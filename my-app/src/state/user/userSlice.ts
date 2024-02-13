import {createSlice} from "@reduxjs/toolkit";


type User = { 
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
    pwd: string;
}


interface UserState {
    users: User;
}

const initialState: UserState = {
    users: {
      firstName: '',
      lastName: '',
      email: '',
      profileImage: '',
      pwd: '',
    },
  };


const userSlice = createSlice({ 
    name:"user",
    initialState,
    reducers:{
        setUserInformation: (state, action) => {
            state.users = action.payload;
          }
    },
});

export const { setUserInformation } = userSlice.actions;

export default userSlice.reducer;