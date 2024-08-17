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
    credentials: "include",
  }),
  endpoints(builder) {
    return {
      currentAdmin: builder.query({
        query: () => {
          return {
            url: `/current-admin`,
            method: "GET",
          };
        },
      }),
      signUpAdmin: builder.mutation({
        query: (formData) => {
          return {
            url: "/signup",
            method: "POST",
            body: {
              email: formData.email,
              password: formData.password,
              secretcode: formData.secretcode,
            },
          };
        },
      }),
      signInAdmin: builder.mutation({
        query: (formData) => {
          return {
            url: `/login`,
            method: "POST",
            body: {
              email: formData.email,
              password: formData.password,
            },
          };
        },
      }),
      signOutAdmin: builder.mutation({
        query: () => {
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
  useSignUpAdminMutation,
  useSignInAdminMutation,
  useSignOutAdminMutation,
  useCurrentAdminQuery,
} = adminApi;
export { adminApi };
