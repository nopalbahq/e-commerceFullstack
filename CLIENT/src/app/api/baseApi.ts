import {
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";

const baseUrlStandar = fetchBaseQuery({
  baseUrl: "https://localhost:5001/api",
});

export const baseQuerySystem = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
) => {
  // Start Loading
  api.dispatch(startLoading());
  new Promise((resolve) => setTimeout(resolve, 1000));
  const result = await baseUrlStandar(args, api, extraOptions);
  // Stop Loading
  api.dispatch(stopLoading());
  if (result.error) {
    const { status, data } = result.error;
    console.log({ status, data });
  }

  return result;
};
