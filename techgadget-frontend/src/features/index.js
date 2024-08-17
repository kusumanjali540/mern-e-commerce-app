import { configureStore } from "@reduxjs/toolkit";
import {
  notificationReducer,
  openModal,
  closeModal,
} from "./slices/notificationSlice";
import {
  updateAddress,
  resetAddress,
  addressReducer,
} from "./slices/addressSlice";
import {
  changeVariant,
  selectedVariantReducer,
} from "./slices/selectedVariantSlice";
import {
  addNewCartItem,
  deleteCartItem,
  refreshCart,
  resetCart,
} from "./slices/cartSlice";
import { testApi } from "./apis/testApi";
import { productsApi } from "./apis/productsApi";
import { reviewsApi } from "./apis/reviewsApi";
import { cartReducer } from "./slices/cartSlice";
import { adminApi } from "./apis/adminApi";
import { customersApi } from "./apis/customersApi";
import { ordersApi } from "./apis/ordersApi";
import { contactApi } from "./apis/contactApi";
import { userAuthApi } from "./apis/userAuthApi";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    cart: cartReducer,
    address: addressReducer,
    selectedVariant: selectedVariantReducer,
    [testApi.reducerPath]: testApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [customersApi.reducerPath]: customersApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [userAuthApi.reducerPath]: userAuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(testApi.middleware)
      .concat(productsApi.middleware)
      .concat(reviewsApi.middleware)
      .concat(adminApi.middleware)
      .concat(ordersApi.middleware)
      .concat(customersApi.middleware)
      .concat(contactApi.middleware)
      .concat(userAuthApi.middleware);
  },
});

export {
  store,
  openModal,
  closeModal,
  changeVariant,
  addNewCartItem,
  deleteCartItem,
  refreshCart,
  resetCart,
  updateAddress,
  resetAddress,
};
export { useUploadFileMutation } from "./apis/testApi";
export { usePostReviewMutation, useFetchReviewsQuery } from "./apis/reviewsApi";
export {
  useSignInAdminMutation,
  useSignUpAdminMutation,
  useSignOutAdminMutation,
  useCurrentAdminQuery,
} from "./apis/adminApi";
export {
  useSignInUserMutation,
  useSignUpUserMutation,
  useSignOutUserMutation,
  useCurrentUserQuery,
} from "./apis/userAuthApi";
export { useSubmitContactFormMutation } from "./apis/contactApi";
export {
  useFetchProductsQuery,
  useFetchProductQuery,
  useAddProductMutation,
  useRemoveProductMutation,
  useEditProductMutation,
  useFetchAllProductsQuery,
  useLazyFetchProductQuery,
  useFetchFindByNameProductsQuery,
  useFetchProductWithSelectedVariantQuery,
  useLazyFetchProductWithSelectedVariantQuery,
} from "./apis/productsApi";
export {
  useFetchCustomersQuery,
  useFetchCustomerQuery,
  useFetchCustomerBySessionQuery,
  useAddCustomerMutation,
  useRemoveCustomerMutation,
  useEditCustomerBySessionMutation,
  useEditCustomerMutation,
} from "./apis/customersApi";
export {
  useFetchOrdersQuery,
  useFetchOrdersBySessionQuery,
  useAddOrderMutation,
  useRemoveOrderMutation,
  useEditOrderMutation,
  useCreateCheckoutSessionMutation,
} from "./apis/ordersApi";
