import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const loadUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Failed to parse user data from localStorage:", error);
    localStorage.removeItem("user"); // Clear corrupted data
    localStorage.removeItem("localTime");
    return null;
  }
};

const initialState = {
  user: loadUserFromLocalStorage(),
  loading: false,
  status: !!localStorage.getItem("user"), // Determine status from user presence
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.status = true;
      state.loading = false;

      // Save user and session time to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("localTime", Date.now());
    },

    logout: (state) => {
      state.user = null;
      state.status = false;

      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("localTime");
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    createSession: (state) => {
      const localTime = localStorage.getItem("localTime");
      const sessionTime = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
      const currentTime = Date.now();

      if (localTime && currentTime - localTime > sessionTime) {
        state.user = null;
        state.status = false;

        // Clear expired session
        localStorage.removeItem("user");
        localStorage.removeItem("localTime");

        // Notify user
        toast.error("Your session has expired. Please log in again.");
      }
    },
  },
});

export const { login, logout, setLoading, createSession } = authSlice.actions;

export default authSlice.reducer;
