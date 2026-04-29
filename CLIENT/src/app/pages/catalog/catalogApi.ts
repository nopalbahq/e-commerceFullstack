import { createApi } from "@reduxjs/toolkit/query/react";
import type { IProduct } from "../../model/product";
import { baseQuerySystem } from "../../api/baseApi";
import type { ProductParams } from "../../model/productParams";
import { filterEmptyValues } from "../../lib/util";
import type { Pagination } from "../../model/pagination";

// catalogApi.ts
// Konfigurasi RTK Query untuk semua request yang berhubungan dengan Product
// reducerPath: nama unik untuk slice ini di Redux store
// baseQuery: konfigurasi dasar HTTP (baseURL, headers, dll)
export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: baseQuerySystem,
  endpoints: (builder) => ({
    // Ambil semua product dengan filter, search, sort, dan pagination
    // Contoh penggunaan: useGetFetchProductsQuery({ orderBy: "price", searchTerm: "boot", pageNumber: 1 })
    getFetchProducts: builder.query<{ items: IProduct[]; pagination: Pagination }, ProductParams>({
      query: (productParams) => {
        return {
          url: "products",
          // filterEmptyValues: hapus parameter yang kosong sebelum dikirim ke API
          // Contoh: { searchTerm: "", pageNumber: 1 } → { pageNumber: 1 }
          params: filterEmptyValues(productParams),
        };
      },
      transformResponse: (items: IProduct[], meta) => {
        const paginationHeader = meta?.response?.headers.get("Pagination");
        const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;

        return { items, pagination };
      },
    }),

    // Ambil 1 product berdasarkan ID
    // Contoh penggunaan: useGetFetchProductQuery(2) → GET /api/products/2
    getFetchProduct: builder.query<IProduct, number>({
      query: (productId) => ({ url: `products/${productId}` }),
    }),

    // Ambil daftar filter yang tersedia (brand & type)
    // Contoh penggunaan: useGetFetchFiltersQuery() → GET /api/products/filters
    // Return: { brand: ["Adidas", "Nike"], type: ["Boots", "Sandals"] }
    getFetchFilters: builder.query<{ brands: string[]; types: string[] }, void>({
      query: () => ({ url: "products/filters" }),
    }),
  }),
});

// Export hooks hasil generate otomatis dari RTK Query
// Penamaan otomatis: use + [NamaEndpoint] + Query
export const { useGetFetchProductsQuery, useGetFetchProductQuery, useGetFetchFiltersQuery } = catalogApi;
