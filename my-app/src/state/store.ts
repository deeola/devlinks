import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import linkSlice from "./link/linkSlice";
import linkComponentSlice from "./link/linkComponentSlice";
import inputSlice from "./inputs/inputSlice";
import dropdownSlice from "./inputs/dropdownSlice";
import mergedValuesSlice from "./inputs/mergedValuesSlice";
import errorSlice from "./inputs/errorSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        link: linkSlice,
        linkComponentSlice: linkComponentSlice,
        input: inputSlice,
        dropdown: dropdownSlice,
        mergedValuesSlice: mergedValuesSlice,
        error: errorSlice
        
        
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;