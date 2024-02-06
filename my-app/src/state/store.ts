import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import linkSlice from "./link/linkSlice";
import linkComponentSlice from "./link/linkComponentSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        link: linkSlice,
        linkComponentSlice: linkComponentSlice,
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;