import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { requests } from "../services/tmdb";

const MovieContext = createContext();

const initialMovies = {
  trending: [],
  netflixOriginals: [],
  popular: [],
  topRated: [],
  action: [],
  comedy: [],
  horror: [],
  romance: [],
  documentaries: []
};

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState(initialMovies);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const responses = await Promise.all(
          Object.values(requests).map((url) =>
            axios.get(url, {
              signal: controller.signal
            })
          )
        );

        setMovies({
          trending: responses[0].data.results,
          netflixOriginals: responses[1].data.results,
          popular: responses[2].data.results,
          topRated: responses[3].data.results,
          action: responses[4].data.results,
          comedy: responses[5].data.results,
          horror: responses[6].data.results,
          romance: responses[7].data.results,
          documentaries: responses[8].data.results
        });

      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error(err);
          setError("Unable to load movies");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

    return () => controller.abort();

  }, []);

  return (
    <MovieContext.Provider value={{ movies, loading, error }}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  return useContext(MovieContext);
}