import {
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";
import { toast } from "react-toastify";

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
    const originalStatus =
      result.error.status === "PARSING_ERROR" && result.error.originalStatus
        ? result.error.originalStatus
        : result.error.status;

    const responseData = result.error.data;

    console.log(result.error);
    switch (originalStatus) {
      case 400:
        toast.error(responseData as string);
        break;
      case 401:
        toast.error(responseData.title);
        break;
      default:
        break;
    }
  }

  return result;
};
