import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ROOT_SERVER_URL } from "../../utils/constants";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const userAuthApi = createApi({
  reducerPath: "user_auths",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ROOT_SERVER_URL}/customer`,
    credentials: "include",
  }),
  endpoints(builder) {
    return {
      currentUser: builder.query({
        query: () => {
          return {
            url: `/current-customer`,
            method: "GET",
          };
        },
      }),
      signUpUser: builder.mutation({
        query: (formData) => {
          return {
            url: "/signup",
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
      }),
      signInUser: builder.mutation({
        query: (formData) => {
          return {
            url: `/login`,
            method: "POST",
            body: {
              email: formData.email,
              password: formData.password,
            },
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
      }),
      signOutUser: builder.mutation({
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
  useSignUpUserMutation,
  useSignInUserMutation,
  useSignOutUserMutation,
  useCurrentUserQuery,
} = userAuthApi;
export { userAuthApi };
