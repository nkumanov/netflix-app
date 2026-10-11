import { Movie } from "../types/movies";


export type GetMoviesResponse = {
  Response: string;
  Search: Movie[];
  totalResults: string;
};

