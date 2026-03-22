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
  }),
});

export const { useGetFetchProductsQuery, useGetFetchProductQuery } = catalogApi;
