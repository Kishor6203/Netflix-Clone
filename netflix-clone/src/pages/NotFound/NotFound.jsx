import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-5">
      <div className="text-center">
        <h1 className="text-8xl md:text-9xl font-bold text-red-600">
          404
        </h1>

        <h2 className="text-3xl md:text-5xl font-bold mt-5">
          Lost your way?
        </h2>

        <p className="text-gray-400 mt-5 max-w-xl">
          Sorry, we couldn't find that page.
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;