import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './features/api/apiSlice';
import authReducer from './features/auth/authSlice';

const store = configureStore({
  reducer: { auth: authReducer, [apiSlice.reducerPath]: apiSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {auth: authState}
export type AppDispatch = typeof store.dispatch;
