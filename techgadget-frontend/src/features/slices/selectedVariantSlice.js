import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

const selectedVariantSlice = createSlice({
  name: "selectedVariant",
  initialState: {
    properties: {},
    price: null,
    storage: 1,
    index: -1,
  },
  reducers: {
    changeVariant: (state, action) => {
      return cloneDeep(action.payload);
    },
  },
});

export const { changeVariant } = selectedVariantSlice.actions;
export const selectedVariantReducer = selectedVariantSlice.reducer;
