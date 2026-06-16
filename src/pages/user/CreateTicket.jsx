import { useState } from "react";
import { LuLoader } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { createTicket } from "../../redux/features/tickets/ticketThunks";
import { selectLoading, selectError } from "../../redux/features/tickets/ticketSlice";

const CreateTicket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useUser();

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("normal");
  const [type, setType] = useState("question");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      createTicket({
        subject,
        description,
        priority,
        type,
        userName: user.fullName || user.firstName,
        userEmail: user.primaryEmailAddress.emailAddress,
      })
    );
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/my-tickets");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10">

        <button onClick={() => navigate("/")} className="text-sm text-gray-500 hover:text-gray-200 mb-8 cursor-pointer flex items-center gap-2">
          <FaArrowLeft /> Back to Dashboard
        </button>

        <div className="bg-gray-900 border border-white/10 shadow-sm rounded-xl p-8">
          <h2 className="text-lg font-semibold text-white mb-1">Create Ticket</h2>
          <p className="text-sm text-gray-500 mb-6">Describe your issue and we'll get back to you.</p>

          {error && <p className="text-sm text-gray-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of your issue"
                required
                className="w-full border border-white/10 rounded px-3 py-2 text-sm bg-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full border border-white/10 rounded px-3 py-2 text-sm bg-gray-800 text-white focus:outline-none focus:border-gray-500"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border border-white/10 rounded px-3 py-2 text-sm bg-gray-800 text-white focus:outline-none focus:border-gray-500"
                >
                  <option value="question">Question</option>
                  <option value="incident">Incident</option>
                  <option value="problem">Problem</option>
                  <option value="task">Task</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your issue in detail"
                required
                rows={5}
                className="w-full border border-white/10 rounded px-3 py-2 text-sm bg-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white font-medium py-2.5 rounded text-sm cursor-pointer transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <><LuLoader className="animate-spin" /> Submitting…</> : "Submit Ticket"}
            </button>
          </form>
        </div>

    </div>
  );
};

export default CreateTicket;
