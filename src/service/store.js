// src/service/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from "../reducers/rootReducer"; // Combined reducers

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['products'], // Only persist the products slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/PAUSE',
                    'persist/PURGE',
                    'persist/FLUSH',
                    'persist/REGISTER',
                ],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };
