import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuerySystem } from "../../api/baseApi";
import type { ICart } from "../../model/cart";
import { cartApi } from "../cart/cartApi";

export const checkoutApi = createApi({
  reducerPath: "checkoutApi",
  baseQuery: baseQuerySystem,
  endpoints: (builder) => ({
    createPayementIntent: builder.mutation<ICart, void>({
      query: () => {
        return {
          url: "payments",
          method: "POST",
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            cartApi.util.updateQueryData("getFetchCart", undefined, (draft) => {
              draft.clientSecret = data.clientSecret;
            }),
          );
        } catch (error) {
          console.log("Payment intent creation failed: ", error);
        }
      },
    }),
  }),
});

export const { useCreatePayementIntentMutation } = checkoutApi;
