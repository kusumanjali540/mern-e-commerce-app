import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ROOT_SERVER_URL } from "../../utils/constants";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const reviewsApi = createApi({
  reducerPath: "reviews",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ROOT_SERVER_URL}/review`,
    // fetchFn: async (...args) => {
    //   await pause(1000);
    //   return fetch(...args);
    // },
  }),
  endpoints(builder) {
    return {
      postReview: builder.mutation({
        // invalidatesTags: (result, error, user) => {
        //   return [{ type: 'UsersProducts', id: user.id }];
        // },
        query: (formData) => {
          return {
            url: "/post-review",
            method: "POST",
            body: formData,
          };
        },
      }),
      //   fetchProducts: builder.query({
      //     // providesTags: (result, error, user) => {
      //     //   const tags = result.map((review) => {
      //     //     return { type: 'Product', id: review.id };
      //     //   });
      //     //   tags.push({ type: 'UsersProducts', id: user.id });
      //     //   return tags;
      //     // },
      //     query: (user) => {
      //       return {
      //         url: "/reviews",
      //         method: "GET",
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //       };
      //     },
      //   }),
    };
  },
});

export const { usePostReviewMutation } = reviewsApi;
export { reviewsApi };
