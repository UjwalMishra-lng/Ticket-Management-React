import { GrNext, GrPrevious } from "react-icons/gr";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between mt-6 bg-gray-900 border border-white/10 rounded-xl px-4 py-3">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-sm font-medium text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
      >
        <GrPrevious /> Previous
      </button>

      <div className="flex gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${currentPage === page
              ? "bg-white/10 text-white border border-white/20"
              : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-sm font-medium text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
      >
        Next <GrNext />
      </button>
    </div>
  );
};

export default Pagination;
