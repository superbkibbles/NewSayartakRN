import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistCombineReducers,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import slices
import persistReducer from './slices/persistSlice';
import generalReducer from './slices/generalSlice';
import loadingReducer from './slices/loadingSlice';
import appSettingsReducer from './slices/appSettingsSlice';

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['persist', 'appSettings'], // Only persist these reducers
  debug: __DEV__, // Enable debugging in development
};

// Combine reducers
const rootReducer = combineReducers({
  persist: persistReducer,
  general: generalReducer,
  loading: loadingReducer,
  appSettings: appSettingsReducer,
});

// Create persisted reducer
const persistedReducer = persistCombineReducers(persistConfig, {
  persist: persistReducer,
  general: generalReducer,
  loading: loadingReducer,
  appSettings: appSettingsReducer,
});

// Configure store with Redux Toolkit
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // Enable Redux DevTools in development
      devTools: __DEV__,
    }),
  // Preloaded state can be added here if needed
  preloadedState: undefined,
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Export configured store function for backward compatibility
const configureAppStore = () => {
  return { store, persistor };
};

export default configureAppStore;
