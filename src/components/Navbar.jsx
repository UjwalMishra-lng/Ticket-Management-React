import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate, NavLink } from "react-router-dom";

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
        <NavLink to="/" className="flex items-center gap-2 cursor-pointer no-underline">
          <h1 className="text-xl font-semibold text-white flex items-center gap-2">
            <img src="tickets.png" alt="logo" className="w-8 h-8 object-contain" />
            Support Portal
          </h1>
        </NavLink>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back, {user?.firstName || "User"}</p>
      </div>
      <button
        onClick={handleLogout}
        className="border border-white/10 bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded text-sm text-white cursor-pointer font-semibold transition-colors duration-200"
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;
