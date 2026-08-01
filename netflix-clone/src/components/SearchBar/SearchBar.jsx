import { FaSearch } from "react-icons/fa";

function SearchBar({
  value,
  onChange,
  placeholder = "Titles, people, genres",
  autoFocus = false
}) {
  return (
    <div className="relative w-full max-w-2xl">
      <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full rounded-md border border-gray-700 bg-[#141414] py-4 pl-12 pr-5 text-white placeholder:text-gray-500 outline-none transition focus:border-white"
      />
    </div>
  );
}

export default SearchBar;