import { configureStore } from "@reduxjs/toolkit";
import {
  notificationReducer,
  openModal,
  closeModal,
} from "./slices/notificationSlice";
import { updateAddress, resetAddress, addressReducer } from "./slices/addressSlice";
import { changeVariant, selectedVariantReducer } from "./slices/selectedVariantSlice";
import { addNewCartItem, deleteCartItem } from "./slices/cartSlice";
import { login, logout } from "./slices/adminSlice";
import { testApi } from "./apis/testApi";
import { productsApi } from "./apis/productsApi";
import { reviewsApi } from "./apis/reviewsApi";
import { cartReducer } from "./slices/cartSlice";
import { adminReducer } from "./slices/adminSlice";
import { adminApi } from "./apis/adminApi";
import { customersApi } from "./apis/customersApi";
import { ordersApi } from "./apis/ordersApi";
import { contactApi } from "./apis/contactApi";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    cart: cartReducer,
    admin: adminReducer,
    address: addressReducer,
    selectedVariant: selectedVariantReducer,
    [testApi.reducerPath]: testApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [customersApi.reducerPath]: customersApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(testApi.middleware)
      .concat(productsApi.middleware)
      .concat(reviewsApi.middleware)
      .concat(adminApi.middleware)
      .concat(ordersApi.middleware)
      .concat(customersApi.middleware)
      .concat(contactApi.middleware);
  },
});

export {
  store,
  openModal,
  closeModal,
  changeVariant,
  addNewCartItem,
  deleteCartItem,
  login, logout,
  updateAddress,
  resetAddress
};
export { useUploadFileMutation } from "./apis/testApi";
export { usePostReviewMutation } from "./apis/reviewsApi";
export { useSignInMutation, useSignUpMutation, useSignOutMutation, useCurrentAdminQuery } from "./apis/adminApi";
export { useSubmitContactFormMutation } from "./apis/contactApi";
export {
  useFetchProductsQuery,
  useFetchProductQuery,
  useAddProductMutation,
  useRemoveProductMutation,
  useEditProductMutation,
  useFetchAllProductsQuery,
  useLazyFetchProductQuery
} from "./apis/productsApi";
export {
  useFetchCustomersQuery,
  useFetchCustomerQuery,
  useAddCustomerMutation,
  useRemoveCustomerMutation,
  useEditCustomerMutation,
} from "./apis/customersApi";
export {
  useFetchOrdersQuery,
  useAddOrderMutation,
  useRemoveOrderMutation,
  useEditOrderMutation,
  useCreateCheckoutSessionMutation
} from "./apis/ordersApi";
