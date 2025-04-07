import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "./slices/habitSlice"; 
import userReducer from "./slices//userSlice"; 

export const store = configureStore({
  reducer: {
    habits: habitReducer,
    user: userReducer
  },
});

export default store;