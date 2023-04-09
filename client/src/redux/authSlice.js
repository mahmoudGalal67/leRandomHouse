import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStart: (state, action) => {
      state.loading = true;
    },
    addUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state, action) => {
      localStorage.removeItem("user");
      state.user = null;
    },
    fetchFinish: (state, action) => {
      state.error = null;
      state.loading = false;
    },
    fetchFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { addUser, fetchFailure, fetchStart, fetchFinish, logout } =
  authSlice.actions;

export default authSlice.reducer;
