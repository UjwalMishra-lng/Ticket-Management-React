import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import MyTickets from "../../components/MyTickets";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <main className="max-w-3xl mx-auto mt-10 px-6 pb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">My Tickets</h2>
          <button
            onClick={() => navigate("/create-ticket")}
            className="bg-gray-800 hover:bg-gray-700 border border-white/10 text-sm text-white px-4 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
          >
            <FaPlus /> New Ticket
          </button>
        </div>

        <MyTickets />
    </main>
  );
};

export default Dashboard;
