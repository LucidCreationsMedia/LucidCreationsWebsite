import { configureStore } from "@reduxjs/toolkit";
import activationTokenReducer from "../features/account/activationToken";
import profileReducer from "../features/profile";

export const store = configureStore({
  reducer: {
    activationToken: activationTokenReducer,
    profile: profileReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
