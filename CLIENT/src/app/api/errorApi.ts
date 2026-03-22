import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuerySystem } from "./baseApi";

export const errorApi = createApi({
  reducerPath: "errorApi",
  baseQuery: baseQuerySystem,
  endpoints: (builder) => ({
    getError400: builder.query<void, void>({
      query: () => ({ url: "buggy/bad-request" }),
    }),
    getError401: builder.query<void, void>({
      query: () => ({ url: "buggy/unauthorized-error" }),
    }),
    getError404: builder.query<void, void>({
      query: () => ({ url: "buggy/not-found" }),
    }),
    getError500: builder.query<void, void>({
      query: () => ({ url: "buggy/server-error" }),
    }),
    getValidationError: builder.query<void, void>({
      query: () => ({ url: "buggy/validation-error" }),
    }),
  }),
});

export const {
  useLazyGetError400Query,
  useLazyGetError401Query,
  useLazyGetError404Query,
  useLazyGetError500Query,
  useLazyGetValidationErrorQuery,
} = errorApi;
