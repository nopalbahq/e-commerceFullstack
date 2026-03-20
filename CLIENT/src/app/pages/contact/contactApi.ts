import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IDummy } from "../../model/dummy";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:5001/api" }),
  endpoints: (builder) => {
    return {
      getFetchDataDummy: builder.query<IDummy[], void>({
        query: () => {
          return { url: "contact" };
        },
      }),
      getFetchDataEachDummy: builder.query<IDummy, number>({
        query: (number) => {
          return { url: `contact/${number}` };
        },
      }),
    };
  },
});

export const { useGetFetchDataDummyQuery, useGetFetchDataEachDummyQuery } =
  contactApi;
