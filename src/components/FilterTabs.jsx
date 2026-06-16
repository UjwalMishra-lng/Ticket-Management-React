
const FilterTabs = ({ currentStatus, onStatusChange }) => {
  const statuses = ["All", "Open", "Pending", "Solved"];

  return (
    <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onStatusChange(status)}
          className={`text-sm px-4 py-1.5 rounded-full transition-colors ${currentStatus === status
              ? "bg-white text-gray-900 font-medium shadow"
              : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
