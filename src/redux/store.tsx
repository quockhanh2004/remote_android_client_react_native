import {combineReducers, configureStore} from '@reduxjs/toolkit';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import {persistStore, persistReducer, PersistConfig} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import messageReducer from './slice/message.slice';
import deviceReducer from './slice/devices.slice';
import userReducer from './slice/user.slice';
import apiMiddleware from './middleware/apiMiddleware';

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  message: messageReducer,
  devices: deviceReducer,
  user: userReducer,
});

let persistConfig: PersistConfig<RootState>;
persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['register'],
      },
    }).concat(apiMiddleware),
});

export const persistor = persistStore(store);

export default {store, persistor};
