import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notifications: [],
    loading: false,
    error: null
}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotifications: (state, action) => {
            state.notifications = action.payload;
        },
        addNotification: (state, action) => {
            state.notifications.push(action.payload);
        },
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter(
                notif => notif.$id !== action.payload
            );
        },
        deactivateNotification: (state, action) => {
            state.notifications = state.notifications.map(notif =>
                notif.$id === action.payload
                    ? { ...notif, isActive: false }
                    : notif
            );
        },
        activateNotification: (state, action) => {
            state.notifications = state.notifications.map(notif =>
                notif.$id === action.payload
                    ? { ...notif, isActive: true }
                    : notif
            );
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setNotifications, addNotification, removeNotification, deactivateNotification, activateNotification, setLoading, setError } = notificationSlice.actions;

export default notificationSlice.reducer;