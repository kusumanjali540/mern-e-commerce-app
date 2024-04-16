import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isAuth: "",
  },
  reducers: {
    clearAuthStorage: (state, action) => {
      console.log("Clear");
      localStorage.setItem("token", "");
      localStorage.setItem("adminId", "");

      state.isAuth =
        localStorage.getItem("adminId") && localStorage.getItem("token");
    },
    setAuthState: (state, action) => {
      state.isAuth =
        localStorage.getItem("adminId") && localStorage.getItem("token");
      console.log(state.isAuth);
    },
  },
});

export const { clearAuthStorage, setAuthState } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
