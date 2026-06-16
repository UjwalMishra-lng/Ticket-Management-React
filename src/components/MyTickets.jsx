import { useEffect, useState } from "react";
import { LuLoader } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { fetchMyTickets, searchMyTickets } from "../redux/features/tickets/ticketThunks";
import { selectTickets, selectSearchedTickets, selectLoading, selectError } from "../redux/features/tickets/ticketSlice";
import SearchBox from "./SearchBox";
import Pagination from "./Pagination";
import FilterTabs from "./FilterTabs";

const MyTickets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useUser();

  const tickets = useSelector(selectTickets);
  const searchedTickets = useSelector(selectSearchedTickets);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const perPage = 4;

  const userEmail = user.primaryEmailAddress.emailAddress;

  useEffect(() => {
    if (!isSearching) {
      dispatch(fetchMyTickets({ userEmail }));
    }
  }, [dispatch, userEmail, isSearching]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) { setIsSearching(false); return; }
    setIsSearching(true);
    setCurrentPage(1);
    dispatch(searchMyTickets({ userEmail, searchTerm }));
  };

  const handleClear = () => {
    setSearchTerm("");
    setIsSearching(false);
    setCurrentPage(1);
    dispatch(fetchMyTickets({ userEmail }));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleStatusChange = (newStatus) => {
    setStatusFilter(newStatus);
    setCurrentPage(1);
  };

  let displayed = isSearching ? searchedTickets : tickets;

  if (statusFilter !== "All") {
    displayed = displayed.filter(
      (ticket) => ticket.status.toLowerCase() === statusFilter.toLowerCase()
    );
  }

  displayed = [...displayed].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const totalPages = Math.ceil(displayed.length / perPage);
  const paginatedTickets = displayed.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div>
      <SearchBox
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        onClear={handleClear}
        isSearching={isSearching}
        resultCount={searchedTickets.length}
        loading={loading}
      />

      <FilterTabs currentStatus={statusFilter} onStatusChange={handleStatusChange} />

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-2 text-sm text-gray-400">
          <LuLoader className="animate-spin" /> Loading…
        </div>
      ) : (
        <>
          {error && <p className="text-sm text-gray-500 mt-4">{error}</p>}
          {displayed.length === 0 && !error && (
            <p className="text-sm text-gray-400 mt-4">
              {isSearching ? `No results for "${searchTerm}"` : "No tickets yet."}
            </p>
          )}

          {displayed.length > 0 && (
            <div className="flex flex-col gap-4 mt-4">
              {paginatedTickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => navigate(`/ticket/${ticket.id}`)}
                  className="bg-gray-900 border border-white/10 shadow-sm rounded-xl px-6 py-4 flex items-center justify-between hover:bg-gray-800 transition-colors text-left cursor-pointer w-full"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{ticket.subject}</p>
                    <p className="text-xs text-gray-400 mt-0.5">#{ticket.id} · {formatDate(ticket.created_at)}</p>
                  </div>
                  <span className="text-xs text-gray-400 border border-white/10 px-2 py-0.5 rounded capitalize shrink-0">
                    {ticket.status}
                  </span>
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {!loading && displayed.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default MyTickets;
