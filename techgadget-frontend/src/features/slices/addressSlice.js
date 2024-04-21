import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    emailPhone: "",
    firstName: "",
    lastName: "",
    address: "",
    country: "",
    city: "",
    stateName: "",
    zipcode: "",
    lat: "",
    lon: "",
    isSaveInfo: false,
    newLetterChecked: false,
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
        emailPhone,
        isSaveInfo,
        newLetterChecked,
        lat,
        lon
      } = action.payload;
      state.emailPhone = emailPhone;
      state.country = country;
      state.firstName = firstName;
      state.lastName = lastName;
      state.address = address;
      state.city = city;
      state.stateName = stateName;
      state.zipcode = zipcode;
      state.isSaveInfo = isSaveInfo;
      state.newLetterChecked = newLetterChecked;
      state.lat = lat;
      state.lon = lon;
    },
    resetAddress: (state) => {
      state.country = "";
      state.firstName = "";
      state.lastName = "";
      state.address = "";
      state.city = "";
      state.lat = "";
      state.lon = "";
      state.stateName = "";
      state.zipcode = "";
      state.emailPhone = "";
      state.isSaveInfo = false;
      state.newLetterChecked = false;
    },
  },
});

export const { updateAddress, resetAddress } = addressSlice.actions;
export const addressReducer = addressSlice.reducer;
