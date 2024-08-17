import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ROOT_SERVER_URL } from "../../utils/constants";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ROOT_SERVER_URL}/product`,
    credentials: "include",
  }),
  endpoints(builder) {
    return {
      removeProduct: builder.mutation({
        invalidatesTags: (result, error, productId) => [
          { type: "Product", id: productId },
          { type: "Product", id: "LIST" },
        ],
        query: (productId) => {
          return {
            url: `/${productId}`,
            method: "DELETE",
          };
        },
      }),
      addProduct: builder.mutation({
        invalidatesTags: [{ type: "Product", id: "LIST" }],
        query: (formData) => {
          return {
            url: "/create-product",
            method: "POST",
            body: formData,
          };
        },
      }),
      fetchAllProducts: builder.query({
        providesTags: (result) => {
          // Log the result
          console.log("Result from fetchProducts:", result?.products);

          return result?.products
            ? [
                ...result.products.map(({ _id }) => ({
                  type: "Product",
                  id: _id,
                })),
                { type: "Product", id: "LIST" },
              ]
            : [{ type: "Product", id: "LIST" }];
        },
        query: () => {
          return {
            url: `/all-products`,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
      }),
      fetchProducts: builder.query({
        providesTags: (result) => {
          // Log the result
          console.log("Result from fetchProducts:", result?.products);

          return result?.products
            ? [
                ...result.products.map(({ _id }) => ({
                  type: "Product",
                  id: _id,
                })),
                { type: "Product", id: "LIST" },
              ]
            : [{ type: "Product", id: "LIST" }];
        },
        query: ({ category, page, perPage }) => {
          console.log(page, perPage);
          return {
            url: `/products?category=${category}&page=${page}&per_page=${
              perPage || 2
            }`,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
      }),
      fetchFindByNameProducts: builder.query({
        providesTags: (result) => {
          // Log the result
          console.log("Result from fetchProducts:", result?.products);

          return result?.products
            ? [
                ...result.products.map(({ _id }) => ({
                  type: "Product",
                  id: _id,
                })),
                { type: "Product", id: "LIST" },
              ]
            : [{ type: "Product", id: "LIST" }];
        },
        query: (searchTerm) => {
          console.log(searchTerm);
          return {
            url: `/find-by-name-products?search_term=${searchTerm}`,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
      }),
      fetchProduct: builder.query({
        providesTags: (result, error, id) => {
          // Log the result, error, and id
          return [{ type: "Product", id }];
        },
        query: (id) => {
          return {
            url: `/${id}`,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
      }),
      fetchProductWithSelectedVariant: builder.query({
        query: (cartItem) => {
          return {
            url: `/product-for-cart-item?productId=${
              cartItem.productId
            }&variant_properties=${JSON.stringify(cartItem.variantProperties)}`,
            method: "Get",
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
      }),
      editProduct: builder.mutation({
        invalidatesTags: (result, error, { productId }) => [
          { type: "Product", id: productId },
        ],
        query: ({ formData, productId }) => {
          console.log(formData, productId);

          return {
            url: `/${productId}`,
            method: "PUT",
            body: formData,
          };
        },
      }),
    };
  },
});

export const {
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
} = productsApi;
export { productsApi };
