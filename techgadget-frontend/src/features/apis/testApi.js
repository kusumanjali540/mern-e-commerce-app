// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ROOT_SERVER_URL } from "../../utils/constants";

export const testApi = createApi({
  reducerPath: "testApi",
  baseQuery: fetchBaseQuery({ baseUrl: ROOT_SERVER_URL }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (data) => ({
        url: "/upload",
        method: "POST",
        body: data,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      }),
    }),
  }),
});

export const { useUploadFileMutation } = testApi;
