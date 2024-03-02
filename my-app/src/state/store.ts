import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react"; 
import linkSlice from "./link/linkSlice";
import dropdownSlice from "./inputs/dropdownSlice";
import mergedValuesSlice from "./inputs/mergedValuesSlice";
import promptSlice from "./link/promptSlice";
import authSlice from "./user/authSlice";
import { apiSlice } from "./api/apiSlice";
import notificationSlice from "./notification/notificationSlice";



export const store = configureStore({
  reducer: {
    notification: notificationSlice,
    user: userSlice,
    link: linkSlice,
    dropdown: dropdownSlice,
    mergedValuesSlice: mergedValuesSlice,
    promptSlice: promptSlice,
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: { warnAfter: 128 },
    }).concat(apiSlice.middleware),
});


// Call setupListeners to add RTK-Query middleware
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
