import { useEffect, useState } from "react";
import { LuLoader } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { fetchTicketDetails, fetchTicketComments, addComment } from "../../redux/features/tickets/ticketThunks";
import { selectSelectedTicket, selectComments, selectLoading, selectError } from "../../redux/features/tickets/ticketSlice";
import { clearSelectedTicket } from "../../redux/features/tickets/ticketSlice";
import CommentList from "../../components/CommentList";
import AddCommentForm from "../../components/AddCommentForm";

const TicketDetails = () => {
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ticket = useSelector(selectSelectedTicket);
  const comments = useSelector(selectComments);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    dispatch(clearSelectedTicket());
    dispatch(fetchTicketDetails(ticketId));
    dispatch(fetchTicketComments(ticketId));
  }, [dispatch, ticketId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    const result = await dispatch(addComment({ ticketId, comment: commentText }));
    if (result.meta.requestStatus === "fulfilled") {
      setCommentText("");
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  if (loading && !ticket) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-gray-500 gap-2">
        <LuLoader className="animate-spin" /> Loading…
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">

        <button onClick={() => navigate("/")} className="text-sm text-gray-500 hover:text-gray-200 mb-8 cursor-pointer flex items-center gap-2">
          <FaArrowLeft /> Back to My Tickets
        </button>

        {/* Ticket Info Card */}
        {ticket && (
          <div className="bg-gray-900 border border-white/10 shadow-sm rounded-xl p-6 mb-6">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h2 className="text-lg font-semibold text-white">{ticket.subject}</h2>
              <span className="text-xs text-gray-400 border border-white/10 px-2 py-0.5 rounded capitalize shrink-0">
                {ticket.status}
              </span>
            </div>
            <div className="flex items-center flex-wrap gap-2 mb-4">
              <p className="text-xs text-gray-500">#{ticket.id} · {formatDate(ticket.created_at)}</p>
              {ticket.priority && (
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${
                  ticket.priority === 'urgent' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                  ticket.priority === 'high' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                  'bg-gray-800 text-gray-400 border border-white/10'
                }`}>
                  {ticket.priority} Priority
                </span>
              )}
              {ticket.type && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full capitalize bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {ticket.type}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{ticket.description}</p>
          </div>
        )}

        {error && <p className="text-sm text-gray-500 mb-4">{error}</p>}

        <CommentList comments={comments} formatDate={formatDate} />

        <AddCommentForm
          commentText={commentText}
          setCommentText={setCommentText}
          onSubmit={handleAddComment}
          loading={loading}
        />

    </div>
  );
};

export default TicketDetails;
