import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuerySystem } from "../../api/baseApi";
import type { ICart } from "../../model/cart";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQuerySystem,
  endpoints: (builder) => {
    return {
      // Get ICART
      getFetchCart: builder.query<ICart, void>({
        query: () => "carts",
      }),
      // Add Cart
      addCartItem: builder.mutation<ICart, { productId: number; qty: number }>({
        query: ({ productId, qty }) => ({
          url: `carts?productId=${productId}&qty=${qty}`,
          method: "POST",
        }),
      }),
      // Remove Cart
      removeCartItem: builder.mutation<
        void,
        { productId: number; qty: number }
      >({
        query: ({ productId, qty }) => ({
          url: `carts?productId=${productId}&qty=${qty}`,
          method: "DELETE",
        }),
      }),
    };
  },
});

export const { useGetFetchCartQuery, useAddCartItemMutation } = cartApi;
