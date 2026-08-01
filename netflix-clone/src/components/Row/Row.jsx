import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import MovieCard from "../MovieCard";
import MovieSkeleton from "../MovieSkeleton";

function Row({ title, movies = [], loading = false }) {
  const rowRef = useRef(null);

  function scroll(direction) {
    if (!rowRef.current) return;

    rowRef.current.scrollBy({
      left: direction === "left" ? -500 : 500,
      behavior: "smooth"
    });
  }

  return (
    <section className="relative mb-10 px-5 md:px-12">

      <h2 className="mb-4 text-xl font-bold text-white md:text-2xl">
        {title}
      </h2>


      <button
        onClick={()=>scroll("left")}
        className="absolute left-2 top-1/2 z-20 hidden h-12 w-10 -translate-y-1/2 items-center justify-center rounded bg-black/70 text-white transition hover:bg-black md:flex"
      >
        <FaChevronLeft/>
      </button>


      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-5 scrollbar-hide"
      >

        {
          loading
          ? Array.from({length:8}).map((_,i)=>(
              <MovieSkeleton key={i}/>
            ))

          : movies.length
          ? movies.map(movie=>(
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))

          : (
            <p className="text-gray-400">
              No movies available
            </p>
          )
        }

      </div>


      <button
        onClick={()=>scroll("right")}
        className="absolute right-2 top-1/2 z-20 hidden h-12 w-10 -translate-y-1/2 items-center justify-center rounded bg-black/70 text-white transition hover:bg-black md:flex"
      >
        <FaChevronRight/>
      </button>


    </section>
  );
}

export default Row;