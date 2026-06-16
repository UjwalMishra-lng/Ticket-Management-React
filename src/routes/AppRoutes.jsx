import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/user/Dashboard";
import CreateTicket from "../pages/user/CreateTicket";
import TicketDetails from "../pages/user/TicketDetails";

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />

    {/* Protected routes */}
    <Route
      element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }
    >
      <Route path="/" element={<Dashboard />} />
      <Route path="/create-ticket" element={<CreateTicket />} />
      <Route path="/ticket/:ticketId" element={<TicketDetails />} />
    </Route>

    {/* Catch-all */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;