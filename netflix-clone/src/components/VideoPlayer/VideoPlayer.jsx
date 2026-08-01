import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaSpinner } from "react-icons/fa";

function VideoPlayer({ videoKey, close }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoKey) return;

    const handleEscape = (e) => e.key === "Escape" && close();

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
      setLoading(true);
    };
  }, [videoKey, close]);

  if (!videoKey) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={close}
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 p-5 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative aspect-video w-full max-w-6xl overflow-hidden rounded-lg bg-black shadow-2xl"
        >
          <button
            onClick={close}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white transition hover:bg-red-600"
          >
            <FaTimes />
          </button>

          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black text-white">
              <FaSpinner className="animate-spin text-3xl text-red-600" />
              <p className="text-sm text-gray-300">Loading trailer...</p>
            </div>
          )}

          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`}
            title="Movie Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setLoading(false)}
            className="h-full w-full border-0"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default VideoPlayer;