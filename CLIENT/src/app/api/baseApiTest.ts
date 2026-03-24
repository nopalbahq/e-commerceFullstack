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

const sleep = () => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

type ErrorResponse = string | { title: string } | { error: string[] };

export const baseQuerySystem = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
) => {
  // Start Loading
  api.dispatch(startLoading());
  await sleep();
  const result = await baseUrlStandar(args, api, extraOptions);
  // Stop Loading
  api.dispatch(stopLoading());
  if (result.error) {
    const originalStatus =
      result.error.status === "PARSING_ERROR" && result.error.originalStatus
        ? result.error.originalStatus
        : result.error.status;

    const responseData = result.error.data as ErrorResponse;

    console.log(result.error);
    // GET error data dari BuggyController
    switch (originalStatus) {
      case 400:
        if (typeof responseData === "string") toast.error(responseData);
        else if ("errors" in responseData) {
          toast.error("validation Error");
        }
        break;
      case 401:
        if (typeof responseData === "object" && "title" in responseData)
          toast.error(responseData.title);
        break;
      case 404:
        if (typeof responseData === "object" && "title" in responseData)
          toast.error(responseData.title);
        break;
      case 500:
        if (typeof responseData === "object" && "title" in responseData)
          toast.error(responseData.title);
        break;
      default:
        break;
    }
  }

  return result;
};
