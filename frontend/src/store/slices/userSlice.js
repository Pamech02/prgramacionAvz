import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  status: false, 
  loading: false, 
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.status = true;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.status = false;
      state.token = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.status = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
