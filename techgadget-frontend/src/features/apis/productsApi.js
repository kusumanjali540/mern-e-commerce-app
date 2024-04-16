import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mern-e-commerce-app-api.vercel.app/product",
  }),
  endpoints(builder) {
    return {
      removeProduct: builder.mutation({
        // invalidatesTags: ["Product"],
        // invalidatesTags: (result, error, product) => {
        //   return [{ type: 'Product', id: product.id }];
        // },
        query: (productId) => {
          return {
            url: `/${productId}`,
            method: "DELETE",
          };
        },
      }),
      addProduct: builder.mutation({
        // invalidatesTags: ["Product"],
        // invalidatesTags: (result, error, user) => {
        //   return [{ type: 'UsersProducts', id: user.id }];
        // },
        query: (formData) => {
          return {
            url: "/create-product",
            method: "POST",
            body: formData,
          };
        },
      }),
      fetchProducts: builder.query({
        // providesTags: ["Product"],
        // providesTags: (result, error, user) => {
        //   const tags = result.map((product) => {
        //     return { type: 'Product', id: product.id };
        //   });
        //   tags.push({ type: 'UsersProducts', id: user.id });
        //   return tags;
        // },
        query: ({ page, perPage }) => {
          console.log(page, perPage);
          return {
            url: `/products?page=${page}&per_page=${perPage || 2}`,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
      }),
      fetchProduct: builder.query({
        // providesTags: (result, error, user) => {
        //   const tags = result.map((product) => {
        //     return { type: 'Product', id: product.id };
        //   });
        //   tags.push({ type: 'UsersProducts', id: user.id });
        //   return tags;
        // },
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
        // invalidatesTags: ["Product"],
        // invalidatesTags: (result, error, user) => {
        //   return [{ type: 'UsersProducts', id: user.id }];
        // },
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
} = productsApi;
export { productsApi };
