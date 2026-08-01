import { useNavigate } from "react-router-dom";
import { FaRedoAlt, FaHome } from "react-icons/fa";

function ErrorMessage({ message }) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-5 text-white">
      <div className="max-w-lg text-center">

        <h1 className="mb-4 text-6xl font-black text-red-600">
          Oops!
        </h1>

        <h2 className="mb-3 text-2xl font-semibold">
          Something went wrong.
        </h2>

        <p className="mx-auto mb-8 text-gray-400">
          {message || "We're having trouble loading this page. Please check your internet connection or try again in a few moments."}
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">

          <button onClick={() => window.location.reload()} className="flex items-center justify-center gap-2 rounded bg-white px-6 py-3 font-bold text-black transition hover:bg-gray-300">
            <FaRedoAlt />
            Try Again
          </button>

          <button onClick={() => navigate("/")} className="flex items-center justify-center gap-2 rounded border border-gray-600 px-6 py-3 font-bold transition hover:bg-gray-800">
            <FaHome />
            Back to Home
          </button>

        </div>

      </div>
    </div>
  );
}

export default ErrorMessage;