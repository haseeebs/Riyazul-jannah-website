import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import packageReducer from './packageSlice';
import notificationReducer from './notificationSlice';
import { persistReducer, persistStore } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
// import { createTransform } from 'redux-persist';

// // Create expiry transform
// const createExpiryTransform = (expiryHours = 24) => {
//   return createTransform(
//     // transform state on its way to being serialized and persisted
//     (inboundState) => {
//       return {
//         ...inboundState,
//         timestamp: new Date().getTime()
//       }
//     },
//     // transform state being rehydrated
//     (outboundState) => {
//       const now = new Date().getTime();
//       const storedTime = outboundState.timestamp;
//       const expiryTime = expiryHours * 60 * 60 * 1000; // convert hours to milliseconds

//       if (storedTime && now - storedTime > expiryTime) {
//         // Data has expired, return empty state
//         return {
//           packages: [],
//           hotels: [],
//           commonInclusions: [],
//           allImages: [],
//           foodImages: [],
//           loading: false,
//           error: null
//         }
//       }
//       return outboundState;
//     }
//   );
// }

const packagePersistConfig = {
    key: 'package',
    storage: sessionStorage,
    whitelist: ['packages', 'hotels', 'commonInclusions', 'allImages', 'foodImages'], // Iske andar jo packages hain sirf unko
    // transforms: [createExpiryTransform(24)] // 24 hours expiry
};

const notificationPersistConfig = {
    key: 'notification',
    storage: sessionStorage,
    whitelist: ['notifications'], // and in notifications ko
    // transforms: [createExpiryTransform(12)] // 12 hours expiry
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