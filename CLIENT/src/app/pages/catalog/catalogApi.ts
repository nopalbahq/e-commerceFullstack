import { createApi } from "@reduxjs/toolkit/query/react";
import type { IProduct } from "../../model/product";
import { baseQuerySystem } from "../../api/baseApi";

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: baseQuerySystem,
  endpoints: (builder) => ({
    getFetchProducts: builder.query<IProduct[], void>({
      query: () => ({ url: "products" }),
    }),
    getFetchProduct: builder.query<IProduct, number>({
      query: (productId) => ({ url: `products/${productId}` }),
    }),
    getFetchFilters: builder.query<{ brand: string[]; type: string[] }, void>({
      query: () => ({ url: "products/filters" }),
    }),
  }),
});

export const { useGetFetchProductsQuery, useGetFetchProductQuery, useGetFetchFiltersQuery } = catalogApi;
