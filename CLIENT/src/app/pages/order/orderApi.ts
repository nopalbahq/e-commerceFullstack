import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuerySystem } from "../../api/baseApi";
import { type CreateOrder, type Order } from "../../model/order";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQuerySystem,
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    fetchOrders: builder.query<Order[], void>({
      query: () => "orders",
      providesTags: ["Orders"],
    }),
    fechOrderDetailed: builder.query<Order, number>({
      query: (id) => ({
        url: `order/${id}`,
      }),
    }),
    createOrder: builder.mutation<Order, CreateOrder>({
      query: (order) => ({
        url: `orderes`,
        method: "POST",
        body: order,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(orderApi.util.invalidateTags(["Orders"]));
      }, //Check claude
    }),
  }),
});

export const { useFetchOrdersQuery, useFechOrderDetailedQuery, useCreateOrderMutation } = orderApi;
