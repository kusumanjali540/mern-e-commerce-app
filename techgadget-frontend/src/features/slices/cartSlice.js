import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import {
  addToCart,
  deleteFromCart,
  emptyCart,
  getCartItemsWithTimestamps,
} from "../../services/useLocalStorageService";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getCartItemsWithTimestamps() || [],
    count: getCartItemsWithTimestamps().length || 0,
  },
  reducers: {
    refreshCart: (state) => {
      const initialState = {
        items: getCartItemsWithTimestamps() || [],
        count: getCartItemsWithTimestamps().length || 0,
      };
      return initialState;
    },
    resetCart: (state) => {
      emptyCart();

      return {
        items: [],
        count: 0,
      };
    },
    addNewCartItem: (state, action) => {
      const newItem = action.payload;

      addToCart(newItem);

      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.productId === newItem.productId &&
          _.isEqual(item.variantProperties, newItem.variantProperties)
      );

      if (existingItemIndex !== -1) {
        // If item already exists in the cart, update its quantity
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        // If item does not exist in the cart, add it
        state.items.push(newItem);
      }

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
      const { productId, variantProperties } = action.payload;
      const updatedCartItems = deleteFromCart(productId, variantProperties);

      state.items = updatedCartItems;
      state.count = state.items.length;
    },
  },
});

export const { addNewCartItem, deleteCartItem, refreshCart, resetCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
