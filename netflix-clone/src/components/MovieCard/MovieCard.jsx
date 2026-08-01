import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaPlay,
  FaCheck,
  FaPlus,
  FaInfoCircle,
  FaStar
} from "react-icons/fa";

import { useList } from "../../context/ListContext";
import {
  POSTER_BASE_URL,
  PLACEHOLDER_IMAGE,
  getMovieTitle
} from "../../utils";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { toggleList, isInList } = useList();

  const saved = isInList(movie.id);
  const title = getMovieTitle(movie);

  const year =
    movie.release_date?.slice(0,4) ||
    movie.first_air_date?.slice(0,4);


  return (
    <motion.div
      initial={{ opacity:0 }}
      animate={{ opacity:1 }}
      whileHover={{ scale:1.12, y:-12, zIndex:20 }}
      transition={{ duration:.25 }}
      className="group relative min-w-[150px] overflow-hidden rounded-md bg-[#181818] shadow-xl md:min-w-[200px]"
    >

      <img
        src={
          movie.poster_path
          ? `${POSTER_BASE_URL}${movie.poster_path}`
          : PLACEHOLDER_IMAGE
        }
        alt={title}
        loading="lazy"
        onError={(e)=>e.currentTarget.src=PLACEHOLDER_IMAGE}
        onClick={()=>navigate(`/movie/${movie.id}`)}
        className="h-[230px] w-full cursor-pointer object-cover transition duration-500 group-hover:brightness-50 md:h-[300px]"
      />


      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/80 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100">


        <h3 className="line-clamp-1 text-base font-bold text-white">
          {title}
        </h3>


        <div className="mt-2 flex items-center gap-3 text-xs text-gray-300">

          <span className="flex items-center gap-1 text-yellow-400">
            <FaStar size={11}/>
            {movie.vote_average?.toFixed(1) || "N/A"}
          </span>

          <span>
            {year || "----"}
          </span>

          <span className="rounded border border-gray-500 px-1">
            HD
          </span>

        </div>


        <p className="mt-2 line-clamp-2 text-xs text-gray-300">
          {movie.overview || "No description available"}
        </p>


        <div className="mt-4 flex items-center gap-3">


          <button
            onClick={(e)=>{
              e.stopPropagation();
              navigate(`/movie/${movie.id}`);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition hover:bg-gray-300"
          >
            <FaPlay size={13}/>
          </button>


          <button
            onClick={(e)=>{
              e.stopPropagation();
              toggleList(movie);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white text-white transition hover:bg-white hover:text-black"
          >
            {
              saved
              ? <FaCheck size={13}/>
              : <FaPlus size={13}/>
            }
          </button>


          <button
            onClick={(e)=>{
              e.stopPropagation();
              navigate(`/movie/${movie.id}`);
            }}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-white text-white transition hover:bg-white hover:text-black"
          >
            <FaInfoCircle size={14}/>
          </button>


        </div>


      </div>

    </motion.div>
  );
}

export default MovieCard;