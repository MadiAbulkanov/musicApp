import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import userSlice from '../features/user/user.slice';
import { rootReducer } from './rootReducer';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import { injectStore } from '../api/axiosApiClient';

const persistConfig = {
  key: 'root',
  storage,
  whiteList: [userSlice.name],
};

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddelware) => getDefaultMiddelware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;