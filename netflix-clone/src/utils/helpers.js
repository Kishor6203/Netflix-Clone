export function truncateText(text, limit = 150) {
    if (!text) {
      return "";
    }
  
    if (text.length <= limit) {
      return text;
    }
  
    return text.substring(0, limit) + "...";
  }
  
  export function getMovieTitle(movie) {
    return (
      movie?.title ||
      movie?.name ||
      movie?.original_name ||
      "Unknown"
    );
  }
  
  export function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }