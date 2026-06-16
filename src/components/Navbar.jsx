import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(() => navigate("/login"));
  };

  return (
    <header className="border-b border-white/10 px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-white">Support Portal</h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back, {user?.firstName || "User"}</p>
      </div>
      <button
        onClick={handleLogout}
        className="border border-white/10 hover:bg-white/10 px-4 py-1.5 rounded text-sm text-gray-300 cursor-pointer"
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;
