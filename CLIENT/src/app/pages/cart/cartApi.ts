import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuerySystem } from "../../api/baseApi";
import type { ICart } from "../../model/cart";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQuerySystem,
  tagTypes: ["Carts"],
  endpoints: (builder) => {
    return {
      // Get ICART
      getFetchCart: builder.query<ICart, void>({
        query: () => "carts",
        providesTags: ["Carts"],
      }),
      // Add Cart
      addCartItem: builder.mutation<ICart, { productId: number; qty: number }>({
        query: ({ productId, qty }) => ({
          url: `carts?productId=${productId}&qty=${qty}`,
          method: "POST",
        }),
        onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
          try {
            await queryFulfilled;
            dispatch(cartApi.util.invalidateTags(["Carts"]));
          } catch (error) {
            console.log(error);
          }
        },
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
