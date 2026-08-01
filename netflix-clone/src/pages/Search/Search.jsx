import { useState } from "react";

import Navbar from "../../components/Navbar";
import MovieCard from "../../components/MovieCard";
import Loader from "../../components/Loader";

import {
  useDebounce,
  useFetch
} from "../../hooks";

import { searchMovies } from "../../services/tmdb";

function Search() {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 700);

  const url = debouncedQuery
    ? searchMovies(debouncedQuery)
    : null;

  const {
    data,
    loading,
    error
  } = useFetch(url);

  const movies = data?.results || [];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-32 px-5 md:px-12">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-gray-800 p-4 rounded outline-none text-white mb-10"
        />

        {loading && <Loader />}

        {
          error && (
            <p className="text-red-500">
              {error}
            </p>
          )
        }

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))
          }
        </div>

        {
          !loading &&
          debouncedQuery &&
          movies.length === 0 && (
            <p className="text-gray-400">
              No movies found
            </p>
          )
        }
      </div>
    </div>
  );
}

export default Search;