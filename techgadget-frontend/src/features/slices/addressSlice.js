import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    country: "",
    city: "",
    stateName: "",
    zipcode: "",
  },
  reducers: {
    updateAddress: (state, action) => {
      const {
        country,
        firstName,
        lastName,
        address,
        city,
        stateName,
        zipcode,
        email,
      } = action.payload;
      state.email = email;
      state.country = country;
      state.firstName = firstName;
      state.lastName = lastName;
      state.address = address;
      state.city = city;
      state.stateName = stateName;
      state.zipcode = zipcode;
    },
    resetAddress: (state) => {
      state.country = "";
      state.firstName = "";
      state.lastName = "";
      state.address = "";
      state.city = "";
      state.stateName = "";
      state.zipcode = "";
      state.email = "";
    },
  },
});

export const { updateAddress, resetAddress } = addressSlice.actions;
export const addressReducer = addressSlice.reducer;
