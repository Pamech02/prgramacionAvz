import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "./slices/habitSlice"; 
export const store = configureStore({
  reducer: {
    habits: habitReducer,
  },
});
