import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import packageReducer from './packageSlice';
import notificationReducer from './notificationSlice';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';

const packagePersistConfig = {
    key: 'package',
    storage,
    whiteList: ['packages', 'hotels', 'commonInclusions', 'allImages', 'foodImages']
};

const notificationPersistConfig = {
    key: 'notification',
    storage,
    whiteList: ['notifications']
};

const store = configureStore({
    reducer: {
        auth: authReducer,
        package: persistReducer(packagePersistConfig, packageReducer),
        notification: persistReducer(notificationPersistConfig, notificationReducer)
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export const persister = persistStore(store);
export default store;