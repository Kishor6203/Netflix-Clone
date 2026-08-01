const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const createUrl = (path) =>
  `${BASE_URL}${path}?api_key=${API_KEY}&language=en-US`;

export const requests = {
  trending: createUrl("/trending/all/week"),
  netflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_networks=213`,
  popular: createUrl("/movie/popular"),
  topRated: createUrl("/movie/top_rated"),

  action: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  comedy: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  horror: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  romance: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  documentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`
};

export const imageUrl = "https://image.tmdb.org/t/p/original";

export const movieDetails = (id) =>
  createUrl(`/movie/${id}`);

export const similarMovies = (id) =>
  createUrl(`/movie/${id}/similar`);

export const movieVideos = (id) =>
  createUrl(`/movie/${id}/videos`);

export const searchMovies = (query) =>
  `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`;