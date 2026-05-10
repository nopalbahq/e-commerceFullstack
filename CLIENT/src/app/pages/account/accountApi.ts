import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuerySystem } from "../../api/baseApi";
import type { User } from "../../model/user";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: baseQuerySystem,
  endpoints: (builder) => ({
    login: builder.mutation<void, object>({
      query: (creds) => {
        return {
          url: "login?useCookies=true",
          method: "POST",
          body: creds,
        };
      },
    }),
    register: builder.mutation<void, object>({
      query: (creds) => {
        return {
          url: "account/register",
          method: "POST",
          body: creds,
        };
      },
    }),
    useInfo: builder.query<User, void>({
      query: () => "account/user-info",
    }),
    logout: builder.mutation({
      query: () => ({
        url: "account/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useUseInfoQuery, useLogoutMutation } = accountApi;
