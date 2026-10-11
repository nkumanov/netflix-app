import { rootApi } from "../../../store/rootApi";
import { MovieDetails } from "../types/movies";
import { GetMoviesResponse } from "./movieApi.dto";

export const movieApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getMovieById: builder.query<MovieDetails, string>({
      query: (imdbID) => ({
        url: "/",
        params: {
          i: imdbID,
          plot: "full",
        },
      }),
    }),
    getInfiniteMovies: builder.infiniteQuery<
      GetMoviesResponse,
      { category: string },
      number
    >({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
          if (lastPage.Response !== "True" || !lastPage.Search?.length) {
            return undefined;
          }

          const totalPages = Math.ceil(Number(lastPage.totalResults) / 10);
          return lastPageParam < totalPages ? lastPageParam + 1 : undefined;
        },
      },
      query: ({ queryArg, pageParam }) => ({
        url: "",
        params: {
          s: queryArg.category,
          page: pageParam,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetMovieByIdQuery, useGetInfiniteMoviesInfiniteQuery } =
  movieApi;
