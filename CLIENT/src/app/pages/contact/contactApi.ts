import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ICurrency } from "../../model/currency";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:5001/api" }),
  endpoints: (builder) => ({
    getFetchContact: builder.query<ICurrency[], void>({
      query: () => "/contact",
    }),
  }),
});

export const { useGetFetchContactQuery } = contactApi;
