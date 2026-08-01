import { useMovies as useMovieContext } from "../context/MovieContext";

function useMovies() {
  return useMovieContext();
}

export default useMovies;