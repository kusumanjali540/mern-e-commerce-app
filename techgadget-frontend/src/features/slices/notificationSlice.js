import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    isOpen: false,
    data: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.data = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.data = null;
    },
  },
});

export const { openModal, closeModal } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
