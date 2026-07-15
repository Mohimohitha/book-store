import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function PrivateRoute({ allowedRole }) {
  const [auth] = useAuth();

  // Your backend doesn't use tokens, so we check if the user object exists instead
  if (!auth?.user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && auth?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}