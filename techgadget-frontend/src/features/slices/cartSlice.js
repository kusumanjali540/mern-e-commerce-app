import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteFromCart,
  getCartItemsWithTimestamps,
} from "../../services/useLocalStorageService";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getCartItemsWithTimestamps() || [],
    count: getCartItemsWithTimestamps().length || 0,
  },
  reducers: {
    addNewCartItem: (state, action) => {
      console.log(action.payload);
      addToCart(action.payload);
      state.items.push(action.payload);
      state.count = state.items.length;
    },
    updateCartItemPrice: (state, action) => {
      console.log(action.payload);
      const { productId, variant, price } = action.payload;

      const index = state.items.findIndex(
        (item) => item.productId === productId && item.variant === variant
      );
      state.items[index] = { ...state.items[index], totalPrice: price };
    },
    // increaseQuantity: (state, action) => {
    //   const { productId, variant } = action.payload;
    //   updateQuantityInCart(productId, variant, 1);
    //   const item = state.items.find(
    //     (item) => item.productId === productId && item.variant === variant
    //   );
    //   if (item) {
    //     item.quantity++;
    //     state.count = state.items.length;
    //   }
    // },
    // decreaseQuantity: (state, action) => {
    //   const { productId, variant } = action.payload;
    //   updateQuantityInCart(productId, variant, -1);
    //   const item = state.items.find(
    //     (item) => item.productId === productId && item.variant === variant
    //   );
    //   if (item && item.quantity > 1) {
    //     item.quantity--;
    //     state.count = state.items.length;
    //   }
    // },
    deleteCartItem: (state, action) => {
      console.log(action.payload);
      const { productId, variant } = action.payload;
      const updatedCartItems = deleteFromCart(productId, variant);

      state.items = updatedCartItems;
      state.count = state.items.length;
    },
  },
});

export const { addNewCartItem, deleteCartItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
