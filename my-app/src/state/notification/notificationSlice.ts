import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TNotificationState, TNotification } from '../../types';


const initialState: TNotificationState = {
  notifications: [],
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      addNotification: (state, action: PayloadAction<TNotification>) => {
        // Check if a notification with the same ID already exists
        if (!state.notifications.some(notification => notification.id === action.payload.id)) {
          state.notifications.push(action.payload);
        }
      },
      removeNotification: (state, action: PayloadAction<string>) => {
        state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
      },
    },
  });
  

export const selectNotification = (state: { notification: TNotificationState }) => state.notification.notifications;

export const { addNotification, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
