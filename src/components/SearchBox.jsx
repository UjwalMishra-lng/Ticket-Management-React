import { FaSearch } from "react-icons/fa";

const SearchBox = ({ searchTerm, setSearchTerm, onSearch, onClear, isSearching, resultCount, loading }) => {
  return (
    <div className="bg-gray-900 border border-white/10 shadow-sm rounded-xl px-6 py-5 mb-6">
      <form onSubmit={onSearch} className="flex gap-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by keyword or subject…"
          className="flex-1 border border-white/10 rounded px-3 py-2 text-sm bg-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white font-medium px-5 py-2 rounded text-sm cursor-pointer flex items-center gap-2 transition-colors"
        >
          <FaSearch /> Search
        </button>
        {isSearching && (
          <button
            type="button"
            onClick={onClear}
            className="border border-white/10 hover:bg-white/10 px-4 py-2 rounded text-sm text-gray-400 cursor-pointer"
          >
            Clear
          </button>
        )}
      </form>
      {isSearching && (
        <p className="text-xs text-gray-400 mt-2">
          {resultCount} result{resultCount !== 1 ? "s" : ""} for "{searchTerm}"
        </p>
      )}
    </div>
  );
};

export default SearchBox;
