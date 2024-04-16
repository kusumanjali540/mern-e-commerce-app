import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const ordersApi = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/order",
  }),
  endpoints(builder) {
    return {
      removeOrder: builder.mutation({
        // invalidatesTags: ["Order"],
        // invalidatesTags: (result, error, order) => {
        //   return [{ type: 'Order', id: order.id }];
        // },
        query: (orderId) => {
          return {
            url: `/${orderId}`,
            method: "DELETE",
          };
        },
      }),
      addOrder: builder.mutation({
        // invalidatesTags: ["Order"],
        // invalidatesTags: (result, error, order) => {
        //   return [{ type: 'OrdersOrders', id: order.id }];
        // },
        query: (formData) => {
          return {
            url: "/create-order",
            method: "POST",
            body: formData,
          };
        },
      }),
      fetchOrders: builder.query({
        // providesTags: ["Order"],
        // providesTags: (result, error, order) => {
        //   const tags = result.map((order) => {
        //     return { type: 'Order', id: order.id };
        //   });
        //   tags.push({ type: 'OrdersOrders', id: order.id });
        //   return tags;
        // },
        query: ({ page, perPage }) => {
          console.log(page, perPage);
          return {
            url: `/orders?page=${page}&per_page=${perPage || 2}`,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
      }),
      editOrder: builder.mutation({
        // invalidatesTags: ["Order"],
        // invalidatesTags: (result, error, order) => {
        //   return [{ type: 'OrdersOrders', id: order.id }];
        // },
        query: ({ formData, orderId }) => {
          console.log(formData, orderId);

          return {
            url: `/${orderId}`,
            method: "PUT",
            body: formData,
          };
        },
      }),
    };
  },
});

export const {
  useFetchOrdersQuery,
  useFetchOrderQuery,
  useAddOrderMutation,
  useRemoveOrderMutation,
  useEditOrderMutation,
} = ordersApi;
export { ordersApi };
