import { useParams } from "react-router-dom";
import { useState } from "react";
import { FaPlay, FaPlus, FaCheck } from "react-icons/fa";

import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import TrailerModal from "../../components/TrailerModal";

import { useFetch } from "../../hooks";
import { useList } from "../../context/ListContext";

import {
  IMAGE_BASE_URL,
  getMovieTitle,
  formatDate
} from "../../utils";

import {
  movieDetails,
  movieVideos
} from "../../services/tmdb";

function Movie() {
  const { id } = useParams();

  const [showTrailer, setShowTrailer] = useState(false);

  const {
    addToList,
    removeFromList,
    isInList
  } = useList();

  const {
    data: movie,
    loading,
    error
  } = useFetch(movieDetails(id));

  const {
    data: videoData
  } = useFetch(movieVideos(id));


  const trailer = videoData?.results?.find(
    video =>
      video.site === "YouTube" &&
      video.type === "Trailer"
  );


  if (loading) {
    return <Loader fullScreen />;
  }


  if (error || !movie) {
    return (
      <ErrorMessage message={error || "Movie not found"} />
    );
  }


  const saved = isInList(movie.id);


  const handleList = () => {
    saved
      ? removeFromList(movie.id)
      : addToList(movie);
  };


  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />


      <section className="relative min-h-screen overflow-hidden">


        <img
          src={
            movie.backdrop_path
              ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
              : "/fallback.jpg"
          }
          alt={getMovieTitle(movie)}
          className="absolute inset-0 h-full w-full object-cover"
        />


        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

        <div className="absolute bottom-0 h-64 w-full bg-gradient-to-t from-black to-transparent" />


        <div className="relative z-10 flex min-h-screen items-center px-5 pt-28 md:px-16">

          <div className="max-w-4xl">


            <h1 className="mb-6 text-4xl font-black md:text-6xl lg:text-7xl">
              {getMovieTitle(movie)}
            </h1>


            <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-gray-300">

              <span className="text-green-400 font-bold">
                {Math.round(movie.vote_average * 10)}% Match
              </span>

              <span>
                {formatDate(movie.release_date)}
              </span>

              <span>
                {movie.runtime} min
              </span>

              <span className="rounded border border-gray-500 px-2">
                HD
              </span>

            </div>


            <div className="mb-6 flex flex-wrap gap-2">

              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded bg-white/20 px-3 py-1 text-sm"
                >
                  {genre.name}
                </span>
              ))}

            </div>


            <p className="mb-8 max-w-3xl text-sm leading-relaxed text-gray-200 md:text-lg">
              {movie.overview}
            </p>


            <div className="flex flex-wrap gap-4">


              <button
                onClick={() => setShowTrailer(true)}
                className="flex items-center gap-3 rounded bg-white px-8 py-3 font-bold text-black transition hover:bg-gray-300"
              >
                <FaPlay />
                Play
              </button>


              <button
                onClick={handleList}
                className="flex items-center gap-3 rounded bg-gray-500/70 px-8 py-3 font-bold transition hover:bg-gray-500"
              >
                {saved ? <FaCheck /> : <FaPlus />}
                {saved ? "My List" : "Add List"}
              </button>


            </div>


          </div>

        </div>

      </section>


      {showTrailer && trailer && (
        <TrailerModal
          videoKey={trailer.key}
          close={() => setShowTrailer(false)}
        />
      )}

    </div>
  );
}

export default Movie;