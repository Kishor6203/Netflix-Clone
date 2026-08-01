/*
function Loader() {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  export default Loader; */

  function Loader({ fullScreen = false }) {
    return (
      <div className={`${fullScreen ? "fixed inset-0 z-50 bg-black flex items-center justify-center" : "flex items-center justify-center py-10"}`}>
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
      </div>
    );
  }
  
  export default Loader;