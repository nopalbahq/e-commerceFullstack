import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuerySystem } from "../../api/baseApi";
import { IItem, type ICart } from "../../model/cart";
import type { IProduct } from "../../model/product";

export const cartApi = createApi({
  reducerPath: "cartApi", // nama slice di Redux store
  baseQuery: baseQuerySystem, // fungsi untuk memanggil backend (biasanya axios + token)
  tagTypes: ["Carts"], // daftar tag yang boleh digunakan di api ini
  endpoints: (builder) => {
    return {
      // Get ICART
      getFetchCart: builder.query<ICart, void>({
        query: () => "carts",
        providesTags: ["Carts"],
      }),
      // Add Cart
      addCartItem: builder.mutation<ICart, { product: IProduct; qty: number }>({
        query: ({ product, qty }) => ({
          url: `carts?productId=${product.id}&qty=${qty}`,
          method: "POST",
        }),
        //lifecycle hook yang berjalan segera setelah mutation dimulai, sebelum response dari server datang.
        onQueryStarted: async ({ product, qty }, { dispatch, queryFulfilled }) => {
          const patchResult = dispatch(
            cartApi.util.updateQueryData("getFetchCart", undefined, (draft) => {
              const existingItem = draft.items.find((item) => item.productId === product.id);
              if (existingItem) existingItem.quantity += qty;
              else draft.items.push(new IItem(product, qty));
            }),
          );
          try {
            await queryFulfilled; //tunggu sampai server kasih response
            dispatch(cartApi.util.invalidateTags(["Carts"])); // invalidate cache
          } catch (error) {
            console.log(error);
            patchResult.undo(); // batalkan perubahan optimistic
          }
        },
      }),
      // Remove Cart
      removeCartItem: builder.mutation<void, { productId: number; qty: number }>({
        query: ({ productId, qty }) => ({
          url: `carts?productId=${productId}&qty=${qty}`,
          method: "DELETE",
        }),
        onQueryStarted: async ({ productId, qty }, { dispatch, queryFulfilled }) => {
          const patchResult = dispatch(
            cartApi.util.updateQueryData("getFetchCart", undefined, (draft) => {
              const itemIndex = draft.items.findIndex((item) => item.productId === productId);
              if (itemIndex >= 0) {
                draft.items[itemIndex].quantity -= qty;
                if (draft.items[itemIndex].quantity <= 0) {
                  draft.items.splice(itemIndex, 1);
                }
              }
            }),
          );

          try {
            await queryFulfilled;
          } catch (error) {
            console.log(error);
            patchResult.undo();
          }
        },
      }),
    };
  },
});

export const { useGetFetchCartQuery, useAddCartItemMutation, useRemoveCartItemMutation } = cartApi;
