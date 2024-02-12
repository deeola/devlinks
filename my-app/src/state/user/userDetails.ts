import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
  }
  
  interface UserState {
    userInfo: UserInfo;
  }
  
  const initialState: UserState = {
    userInfo: {
      firstName: '',
      lastName: '',
      email: '',
      profileImage: '',
    },
  };
  
 

  const userDetails = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
      setUserInfo: (state, action: PayloadAction<UserInfo>) => {
        state.userInfo = action.payload;
      },
    },
  });
  
 
  export const { setUserInfo } = userDetails.actions;
  export default userDetails;
  