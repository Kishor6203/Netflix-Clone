import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

import Button from "../Button";
import VideoPlayer from "../VideoPlayer";
import { useMovies,useFetch } from "../../hooks";
import { IMAGE_BASE_URL,PLACEHOLDER_IMAGE,getMovieTitle,truncateText } from "../../utils";
import { movieVideos } from "../../services/tmdb";

function Hero(){
  const navigate=useNavigate();
  const {movies}=useMovies();

  const [movie,setMovie]=useState(null);
  const [fade,setFade]=useState(false);
  const [showTrailer,setShowTrailer]=useState(false);

  useEffect(()=>{
    const list=movies?.trending;
    if(!list?.length)return;

    if(!movie)setMovie(list[Math.floor(Math.random()*list.length)]);

    const timer=setInterval(()=>{
      setFade(true);
      setTimeout(()=>{
        setMovie(list[Math.floor(Math.random()*list.length)]);
        setFade(false);
      },500);
    },60000);

    return()=>clearInterval(timer);
  },[movies,movie]);


  const {data}=useFetch(movie?movieVideos(movie.id):null);

  const trailer=data?.results?.find(
    v=>v.site==="YouTube"&&v.type==="Trailer"
  );

  if(!movie)
    return <section className="h-[85vh] animate-pulse bg-black md:h-screen"/>;


  const title=getMovieTitle(movie);
  const year=movie.release_date?.slice(0,4)||movie.first_air_date?.slice(0,4);


  return(
    <>
      <section className="relative h-[85vh] overflow-hidden md:h-screen">

        <img
          src={movie.backdrop_path?`${IMAGE_BASE_URL}${movie.backdrop_path}`:PLACEHOLDER_IMAGE}
          alt={title}
          onError={e=>e.currentTarget.src=PLACEHOLDER_IMAGE}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${fade?"opacity-0":"opacity-100"}`}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"/>
        <div className="absolute bottom-0 h-52 w-full bg-gradient-to-t from-black"/>

        <div className="relative z-10 flex h-full items-center px-5 md:px-16">
          <div className="max-w-3xl">

            <h1 className="mb-5 text-4xl font-black md:text-6xl lg:text-7xl">
              {title}
            </h1>

            <div className="mb-5 flex gap-4 text-sm text-gray-300">
              <span className="text-yellow-400">⭐ {movie.vote_average?.toFixed(1)}</span>
              <span>{year}</span>
              <span className="border border-gray-500 px-1 text-xs">HD</span>
            </div>

            <p className="mb-8 text-sm text-gray-200 md:text-lg">
              {truncateText(movie.overview,220)}
            </p>

            <div className="flex gap-4">
              <Button onClick={()=>trailer&&setShowTrailer(true)}>
                <FaPlay/> Play
              </Button>

              <Button variant="dark" onClick={()=>navigate(`/movie/${movie.id}`)}>
                <AiOutlineInfoCircle/> More Info
              </Button>
            </div>

          </div>
        </div>
      </section>

      {showTrailer&&trailer&&(
        <VideoPlayer videoKey={trailer.key} close={()=>setShowTrailer(false)}/>
      )}
    </>
  );
}

export default Hero;