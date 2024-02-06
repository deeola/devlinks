import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import linkSlice from "./link/linkSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        link: linkSlice,
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;