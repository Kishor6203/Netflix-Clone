import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactPlayer from "react-player";
import { FaTimes } from "react-icons/fa";

function TrailerModal({ videoKey, close }) {
  useEffect(() => {
    document.body.style.overflow = videoKey ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [videoKey]);

  if (!videoKey) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={close}
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-5 backdrop-blur-sm"
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
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-xl text-white transition hover:bg-red-600"
          >
            <FaTimes />
          </button>

          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoKey}`}
            width="100%"
            height="100%"
            playing
            controls
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TrailerModal;