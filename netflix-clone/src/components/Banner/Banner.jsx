import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useMovies } from "../../context/MovieContext";
import { imageUrl, movieVideos } from "../../services/tmdb";

function Banner() {
  const { movies } = useMovies();
  const navigate = useNavigate();

  const trending = movies.trending || [];
  const [movie, setMovie] = useState(null);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (!trending.length) return;

    const randomMovie = () => trending[Math.floor(Math.random() * trending.length)];

    if (!movie) setMovie(randomMovie());

    const interval = setInterval(() => {
      setFade(true);

      setTimeout(() => {
        setMovie(randomMovie());
        setFade(false);
      }, 800);
    }, 60000);

    return () => clearInterval(interval);
  }, [trending]);

  const playTrailer = async () => {
    if (!movie) return;

    try {
      const { data } = await axios.get(movieVideos(movie.id));

      const trailer = data.results.find(
        video => video.site === "YouTube" && video.type === "Trailer"
      );

      if (trailer) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!movie) return <section className="h-[80vh] bg-black md:h-screen animate-pulse" />;

  const title = movie.title || movie.name || movie.original_name;
  const year = movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4);

  return (
    <section className="relative h-[80vh] w-full overflow-hidden md:h-screen">
      <img src={`${imageUrl}${movie.backdrop_path}`} alt={title} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${fade ? "opacity-0" : "opacity-100"}`} />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      <div className="absolute bottom-0 h-56 w-full bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 flex h-full items-center px-6 md:px-16">
        <div className="max-w-3xl">

          <h1 className="mb-5 text-4xl font-black md:text-6xl lg:text-7xl">
            {title}
          </h1>

          <div className="mb-5 flex gap-4 text-sm text-gray-300">
            <span>⭐ {movie.vote_average?.toFixed(1)}</span>
            <span>{year}</span>
            <span>HD</span>
          </div>

          <p className="mb-8 line-clamp-4 text-sm text-gray-200 md:text-lg">
            {movie.overview}
          </p>

          <div className="flex gap-4">
            <button onClick={playTrailer} className="flex items-center gap-3 rounded bg-white px-7 py-3 font-bold text-black transition hover:bg-gray-300">
              <FaPlay />
              Play
            </button>

            <button onClick={() => navigate(`/movie/${movie.id}`)} className="flex items-center gap-3 rounded bg-gray-500/70 px-7 py-3 font-bold text-white transition hover:bg-gray-500">
              <AiOutlineInfoCircle size={22} />
              More Info
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Banner;