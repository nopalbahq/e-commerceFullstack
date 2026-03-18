import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProduct } from "../../model/product";

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:5001/api/" }),
  endpoints: (builder) => ({
    getFetchProducts: builder.query<IProduct[], void>({
      query: () => ({ url: "product" }),
    }),
    getFetchProduct: builder.query<IProduct, number>({
      query: (productId) => ({ url: `product/${productId}` }),
    }),
  }),
});

export const { useGetFetchProductsQuery, useGetFetchProductQuery } = catalogApi;
