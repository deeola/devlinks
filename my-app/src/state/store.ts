import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import linkSlice from "./link/linkSlice";
import dropdownSlice from "./inputs/dropdownSlice";
import mergedValuesSlice from "./inputs/mergedValuesSlice";
import promptSlice from "./link/promptSlice";
import authSlice from "./user/authSlice";


export const store = configureStore({
    reducer: {
        user: userSlice,
        link: linkSlice,
        dropdown: dropdownSlice,
        mergedValuesSlice: mergedValuesSlice,
        promptSlice: promptSlice,
        auth: authSlice
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;