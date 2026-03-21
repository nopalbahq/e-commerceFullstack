import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IDummy } from "../../model/dummy";

export const dummyApi = createApi({
  reducerPath: "dummyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:5001/api" }),
  endpoints: (builder) => {
    return {
      getFetchDummy: builder.query<IDummy[], void>({
        query: () => ({ url: "/dummy" }),
      }),
    };
  },
});
