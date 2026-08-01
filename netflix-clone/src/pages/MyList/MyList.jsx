import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import MovieCard from "../../components/MovieCard";
import { useList } from "../../context/ListContext";
import { FaPlay, FaTrash } from "react-icons/fa";

function MyList() {
  const { myList, removeFromList } = useList();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="px-5 pt-28 md:px-12">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold">
              My List
            </h1>

            <p className="mt-2 text-gray-400">
              {myList.length} {myList.length === 1 ? "title" : "titles"} saved
            </p>
          </div>

        </div>


        {myList.length === 0 ? (

          <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">

            <h2 className="text-3xl font-bold">
              Your list is empty
            </h2>

            <p className="mt-3 text-gray-400">
              Add movies and shows you want to watch later.
            </p>

            <button onClick={() => navigate("/")} className="mt-6 flex items-center gap-3 rounded bg-white px-6 py-3 font-bold text-black hover:bg-gray-300">
              <FaPlay />
              Browse Movies
            </button>

          </div>

        ) : (

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">

            {myList.map((movie) => (

              <div key={movie.id} className="group relative">

                <MovieCard movie={movie} />

                {removeFromList && (
                  <button onClick={() => removeFromList(movie.id)} className="absolute right-2 top-2 rounded-full bg-black/80 p-3 text-red-500 opacity-0 transition group-hover:opacity-100">
                    <FaTrash />
                  </button>
                )}

              </div>

            ))}

          </div>

        )}

      </main>
    </div>
  );
}

export default MyList;