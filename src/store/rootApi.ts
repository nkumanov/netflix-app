import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { api_key } from "../constants/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://www.omdbapi.com/",
  prepareHeaders: (headers) => {
    headers.set("Accept", "application/json");
    return headers;
  },
});

const baseQueryWithApiKey: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = (args, api, extraOptions) => {
  const request = typeof args === "string" ? { url: args } : args;

  return baseQuery(
    {
      ...request,
      params: {
        ...request.params,
        apikey: api_key,
      },
    },
    api,
    extraOptions,
  );
};

export const rootApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithApiKey,
  endpoints: () => ({}),
});
