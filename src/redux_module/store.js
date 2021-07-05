import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import todoReducer from './todoSlice';

const reducers = combineReducers({
  todo: todoReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
