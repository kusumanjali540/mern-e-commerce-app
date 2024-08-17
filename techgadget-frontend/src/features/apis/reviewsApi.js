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
    credentials: 'include',
  }),
  endpoints(builder) {
    return {
      postReview: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          console.log(arg);

          return [{ type: "Review", id: arg.id }];
        },
        query: (formData) => {
          return {
            url: "/post-review",
            method: "POST",
            body: formData,
          };
        },
      }),
      fetchReviews: builder.query({
        providesTags: (result, error, arg) => {
          console.log(result);
          return result?.reviews
            ? [
                ...result.reviews.map(({ id }) => ({ type: "Review", id })),
                "Review",
              ]
            : ["Review"];
        },
        query: ({ productId }) => {
          console.log(productId);
          return {
            url: `/reviews/${productId}`,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
      }),
    };
  },
});

export const { usePostReviewMutation, useFetchReviewsQuery } = reviewsApi;
export { reviewsApi };
