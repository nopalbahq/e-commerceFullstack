import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuerySystem } from "../../api/baseApi";
import { type CreateOrder, type Order } from "../../model/order";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQuerySystem,
  endpoints: (builder) => ({
    fetchOrders: builder.query<Order[], void>({
      query: () => "orders",
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
    }),
  }),
});

export const { useFetchOrdersQuery, useFechOrderDetailedQuery, useCreateOrderMutation } = orderApi;
