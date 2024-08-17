import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ROOT_SERVER_URL } from "../../utils/constants";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const customersApi = createApi({
  reducerPath: "customers",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ROOT_SERVER_URL}/customer`,
    credentials: "include",
  }),
  endpoints(builder) {
    return {
      removeCustomer: builder.mutation({
        // invalidatesTags: ["Customer"],
        // invalidatesTags: (result, error, customer) => {
        //   return [{ type: 'Customer', id: customer.id }];
        // },
        query: (customerId) => {
          return {
            url: `/${customerId}`,
            method: "DELETE",
          };
        },
      }),
      addCustomer: builder.mutation({
        // invalidatesTags: ["Customer"],
        // invalidatesTags: (result, error, customer) => {
        //   return [{ type: 'CustomersCustomers', id: customer.id }];
        // },
        query: (formData) => {
          return {
            url: "/create-customer",
            method: "POST",
            body: formData,
          };
        },
      }),
      fetchCustomers: builder.query({
        // providesTags: ["Customer"],
        // providesTags: (result, error, customer) => {
        //   const tags = result.map((customer) => {
        //     return { type: 'Customer', id: customer.id };
        //   });
        //   tags.push({ type: 'CustomersCustomers', id: customer.id });
        //   return tags;
        // },
        query: ({ page, perPage }) => {
          console.log(page, perPage);
          return {
            url: `/customers?page=${page}&per_page=${perPage || 2}`,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
      }),
      fetchCustomer: builder.query({
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
      fetchCustomerBySession: builder.query({
        providesTags: ["Customer", "Edit"],
        query: () => {
          return {
            url: `/customer-by-session`,
            method: "GET",
          };
        },
      }),
      editCustomer: builder.mutation({
        // invalidatesTags: ["Customer"],
        // invalidatesTags: (result, error, customer) => {
        //   return [{ type: 'CustomersCustomers', id: customer.id }];
        // },
        query: ({ formData, customerId }) => {
          console.log(formData, customerId);

          return {
            url: `/${customerId}`,
            method: "PUT",
            body: formData,
          };
        },
      }),
      editCustomerBySession: builder.mutation({
        invalidatesTags: ["Customer", "Edit"],
        query: (formData) => {
          return {
            url: `/update-customer-by-session`,
            method: "PUT",
            body: formData,
          };
        },
      }),
    };
  },
});

export const {
  useFetchCustomersQuery,
  useFetchCustomerQuery,
  useFetchCustomerBySessionQuery,
  useAddCustomerMutation,
  useRemoveCustomerMutation,
  useEditCustomerMutation,
  useEditCustomerBySessionMutation,
} = customersApi;
export { customersApi };
