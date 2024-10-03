import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import packageReducer from './packageSlice';
import notificationReducer from './notificationSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        package: packageReducer,
        notification: notificationReducer
    }
});

export default store;