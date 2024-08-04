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
        providesTags: ({ products }) => {
          // Log the result
          console.log("Result from fetchProducts:", products);

          return products
            ? [
                ...products.map(({ _id }) => ({ type: "Product", id: _id })),
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
        // providesTags: ({ products }) => {
        //   // Log the result
        //   console.log("Result from fetchProducts:", products);

        //   return products
        //     ? [
        //         ...products.map(({ _id }) => ({ type: "Product", id: _id })),
        //         { type: "Product", id: "LIST" },
        //       ]
        //     : [{ type: "Product", id: "LIST" }];
        // },
        query: ({ category, page, perPage }) => {
          console.log(page, perPage);
          return {
            url: `/products?category=${category}&page=${page}&per_page=${perPage || 2}`,
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
          console.log("Result from fetchProduct:", result);
          console.log("Error from fetchProduct:", error);
          console.log("ID from fetchProduct:", id);

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
} = productsApi;
export { productsApi };
