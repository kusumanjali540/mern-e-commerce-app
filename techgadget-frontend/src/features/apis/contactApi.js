import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ROOT_SERVER_URL } from "../../utils/constants";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const contactApi = createApi({
  reducerPath: "contact",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ROOT_SERVER_URL}/contact`,
    credentials: 'include',
    // fetchFn: async (...args) => {
    //   await pause(1000);
    //   return fetch(...args);
    // },
  }),
  endpoints(builder) {
    return {
      submitContactForm: builder.mutation({
        query: (formData) => {
          return {
            url: "/submit-contact-form",
            method: "POST",
            body: formData,
          };
        },
      }),
    };
  },
});

export const { useSubmitContactFormMutation } = contactApi;
export { contactApi };
