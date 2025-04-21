import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import themeReduce from './theme/themeSlice'
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReduce
});

const persistConfig = {
  key: 'root', /// This is the key value of a local storage persist
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

// if we have more than one reducer we can't use this simple method we neeed Combined method to add it in redux-persist\
// Redux's combineReducers, re-exported for convenience. While configureStore calls this internally, you may wish to call it yourself to compose multiple levels of slice reducers.