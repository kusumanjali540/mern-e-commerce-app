import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ROOT_SERVER_URL } from "../../utils/constants";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const adminApi = createApi({
  reducerPath: "admins",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://mern-e-commerce-app-api.vercel.app/admin",
    baseUrl: `${ROOT_SERVER_URL}/admin`,
  }),
  endpoints(builder) {
    return {
      currentAdmin: builder.query({
        // providesTags: (result, error, user) => {
        //   const tags = result.map((admin) => {
        //     return { type: 'Product', id: admin.id };
        //   });
        //   tags.push({ type: 'UsersProducts', id: user.id });
        //   return tags;
        // },
        query: () => {
          return {
            url: `/current-admin`,
            method: "GET",
          };
        },
      }),
      signUp: builder.mutation({
        // invalidatesTags: (result, error, user) => {
        //   return [{ type: 'UsersProducts', id: user.id }];
        // },
        query: (formData) => {
          return {
            url: "/signup",
            method: "PUT",
            body: {
              email: formData.email,
              password: formData.password,
              secretcode: formData.secretcode,
            }
          };
        },
      }),
      signIn: builder.mutation({
        // providesTags: (result, error, user) => {
        //   const tags = result.map((admin) => {
        //     return { type: 'Product', id: admin.id };
        //   });
        //   tags.push({ type: 'UsersProducts', id: user.id });
        //   return tags;
        // },
        query: (formData) => {
          return {
            url: `/login`,
            method: "POST",
            body: {
              email: formData.email,
              password: formData.password,
            }
          };
        },
      }),
      signOut: builder.mutation({
        // providesTags: (result, error, user) => {
        //   const tags = result.map((admin) => {
        //     return { type: 'Product', id: admin.id };
        //   });
        //   tags.push({ type: 'UsersProducts', id: user.id });
        //   return tags;
        // },
        query: (formData) => {
          return {
            url: `/signout`,
            method: "POST",
          };
        },
      }),
    };
  },
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useCurrentAdminQuery
} = adminApi;
export { adminApi };
