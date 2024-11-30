import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  loading: false,
  status:false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user,
      state.status = true;
        state.loading = false,
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("localTime", Date.now());
    },

    logout: (state) => {
      state.user = null,
      state.status = false;
        localStorage.removeItem("user"),
        localStorage.removeItem("localTime");
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    createSession: (state) => {
      const localTime = localStorage.getItem("localTime");
      const sessionTime = 2 * 60 * 60 * 1000;
      const currentTime = Date.now();
      if (localTime && currentTime - localTime > sessionTime) {
        (state.user = null), localStorage.removeItem("user");
        localStorage.removeItem("localTime");
      }
    },
  },
});

export const { login, logout, setLoading, createSession } = authSlice.actions;

export default authSlice.reducer;
