import { useMovies } from "../../hooks";

import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Row from "../../components/Row";
import Footer from "../../components/Footer";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";

function Home() {
  const { movies, loading, error } = useMovies();

  const categories = [
    ["Trending Now", movies.trending],
    ["Netflix Originals", movies.netflixOriginals],
    ["Popular Movies", movies.popular],
    ["Top Rated", movies.topRated],
    ["Action Movies", movies.action],
    ["Comedy Movies", movies.comedy],
    ["Horror Movies", movies.horror],
    ["Romance Movies", movies.romance],
    ["Documentaries", movies.documentaries]
  ];

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      {loading && !movies.trending.length ? (
        <Loader fullScreen />
      ) : (
        <>
          <Hero />

          <main className="relative z-10 -mt-16 animate-fadeIn">
            {categories.map(([title, data]) => (
              <Row
                key={title}
                title={title}
                movies={data}
                loading={loading}
              />
            ))}
          </main>
        </>
      )}

      <Footer />

    </div>
  );
}

export default Home;