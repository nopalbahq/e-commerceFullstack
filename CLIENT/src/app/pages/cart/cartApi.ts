import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuerySystem } from "../../api/baseApi";
import { IItem, type ICart } from "../../model/cart";
import type { IProduct } from "../../model/product";

function isCartItem(product: IProduct | IItem): product is IItem {
  return (product as IItem).quantity !== undefined;
}

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
      addCartItem: builder.mutation<ICart, { product: IProduct | IItem; quantity: number }>({
        query: ({ product, quantity }) => {
          const productId = isCartItem(product) ? product.productId : product.id;
          return {
            url: `carts?productId=${productId}&qty=${quantity}`,
            method: "POST",
          };
        },
        //lifecycle hook yang berjalan segera setelah mutation dimulai, sebelum response dari server datang.
        onQueryStarted: async ({ product, quantity }, { dispatch, queryFulfilled }) => {
          let isNewCart = false;
          const patchResult = dispatch(
            cartApi.util.updateQueryData("getFetchCart", undefined, (draft) => {
              const productId = isCartItem(product) ? product.productId : product.id;
              if (!draft.cartId) isNewCart = true;

              if (!isNewCart) {
                const existingItem = draft.items.find((item) => item.productId === productId);
                if (existingItem) existingItem.quantity += quantity;
                else draft.items.push(isCartItem(product) ? product : { ...product, productId: product.id, quantity });
              }
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
      removeCartItem: builder.mutation<void, { productId: number; quantity: number }>({
        query: ({ productId, quantity }) => ({
          url: `carts?productId=${productId}&qty=${quantity}`,
          method: "DELETE",
        }),
        onQueryStarted: async ({ productId, quantity }, { dispatch, queryFulfilled }) => {
          const patchResult = dispatch(
            cartApi.util.updateQueryData("getFetchCart", undefined, (draft) => {
              const itemIndex = draft.items.findIndex((item) => item.productId === productId);
              if (itemIndex >= 0) {
                draft.items[itemIndex].quantity -= quantity;
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
